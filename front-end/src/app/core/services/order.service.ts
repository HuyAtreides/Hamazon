import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

import { CartItem } from '../models/cart-item';

import { OrderItem } from '../models/order-item';
import { ShippingAddress } from '../models/shipping-address';
import { filterNull } from '../utils/filter-null';

import { AppConfigService } from './app-config.service';
import { OrderItemDto } from './dtos/order-item-dto';
import { OrderItemMapperService } from './mappers/order-item-mapper.service';
import { ShippingAddressService } from './shipping-address.service';

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
    private readonly shippingAddressService: ShippingAddressService,
  ) {
    this.orderUrl = new URL('order', this.appConfig.apiUrl);
  }

  /** Place order.
   * @param cartItems Order items to place.
   */
  public placeOrder(cartItems: readonly CartItem[]): Observable<readonly OrderItem[]> {
    return this.shippingAddressService.shippingAddress$.pipe(
      filterNull(),
      first(),
      map((shippingAddress) => this.cartItemToOrderItemDto(cartItems, shippingAddress)),
      switchMap((orderItemsDto) =>
        this.http
          .post<readonly OrderItemDto[]>(this.orderUrl.toString(), orderItemsDto)
          .pipe(
            map((response) =>
              response.map((orderItemDto) => this.orderMapper.fromDto(orderItemDto)),
            ),
          ),
      ),
    );
  }

  private cartItemToOrderItemDto(
    cartItems: readonly CartItem[],
    shippingAddress: ShippingAddress,
  ): readonly OrderItemDto[] {
    const currentDate = new Date();

    return cartItems.map((cartItem) =>
      this.orderMapper.toDto({
        ...cartItem,
        placedIn: currentDate,
        shippingAddress,
      }),
    );
  }
}
