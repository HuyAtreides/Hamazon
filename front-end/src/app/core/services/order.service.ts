import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CartItem } from '../models/cart-item';

import { OrderItem } from '../models/order-item';

import { AppConfigService } from './app-config.service';
import { OrderItemDto } from './dtos/order-item-dto';
import { OrderItemMapperService } from './mappers/order-item-mapper.service';

/** Service handles operations related to order. */
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  /** Order url endpoint. */
  private readonly orderUrl: URL;

  public constructor(
    private readonly appConfig: AppConfigService,
    private readonly orderMapper: OrderItemMapperService,
    private readonly http: HttpClient,
  ) {
    this.orderUrl = new URL('order', this.appConfig.apiUrl);
  }

  /** Place order.
   * @param orderItems Order items to place.
   */
  public placeOrder(orderItems: readonly CartItem[]): Observable<readonly OrderItem[]> {
    const currentDate = new Date();

    const orderItemsDto = orderItems.map((orderItem) =>
      this.orderMapper.toDto({
        ...orderItem,
        placedIn: currentDate,
      }),
    );

    return this.http
      .post<readonly OrderItemDto[]>(this.orderUrl.toString(), orderItemsDto)
      .pipe(
        map((response) =>
          response.map((orderItemDto) => this.orderMapper.fromDto(orderItemDto)),
        ),
      );
  }
}
