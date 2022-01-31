import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, first, map, switchMap } from 'rxjs/operators';

import { CartItem } from '../models/cart-item';

import { OrderItem } from '../models/order-item';
import { OrderPaginationOptions } from '../models/order-pagination-options';
import { Page } from '../models/page';
import { ShippingAddress } from '../models/shipping-address';
import { filterNull } from '../utils/filter-null';

import { AppConfigService } from './app-config.service';
import { OrderItemDto } from './dtos/order-item-dto';
import { PageDto } from './dtos/page-dto';
import { OrderItemMapperService } from './mappers/order-item-mapper.service';
import { OrderPaginationOptionsMapperService } from './mappers/order-pagination-options-mapper.service';
import { PageMapperService } from './mappers/page-mapper.service';
import { ShippingAddressService } from './shipping-address.service';

/** Service handles operations related to order. */
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  /** Order url endpoint. */
  private readonly orderUrl: URL;

  /** Url endpoint for searching orders. */
  private readonly searchOrdersUrl: URL;

  public constructor(
    private readonly appConfig: AppConfigService,
    private readonly orderMapper: OrderItemMapperService,
    private readonly http: HttpClient,
    private readonly shippingAddressService: ShippingAddressService,
    private readonly paginationOptionsMapper: OrderPaginationOptionsMapperService,
    private readonly pageMapper: PageMapperService,
  ) {
    this.orderUrl = new URL('order', this.appConfig.apiUrl);
    this.searchOrdersUrl = new URL('order/search', this.appConfig.apiUrl);
  }

  /** Place order.
   * @param cartItems Cart items to place.
   */
  public placeOrder(cartItems: readonly CartItem[]): Observable<void> {
    return this.shippingAddressService.getShippingAddress().pipe(
      filterNull(),
      first(),
      map((shippingAddress) => this.cartItemToOrderItemDto(cartItems, shippingAddress)),
      switchMap((orderItemsDto) =>
        this.http.put<void>(this.orderUrl.toString(), orderItemsDto),
      ),
    );
  }

  /** Get a page of orders using the pagination options.
   * @param paginationOptions Options used to get a page of orders.
   */
  public getOrders(
    paginationOptions: OrderPaginationOptions,
  ): Observable<Page<OrderItem>> {
    const paginationOptionsDto = this.paginationOptionsMapper.toDto(paginationOptions);

    return this.http
      .post<PageDto<OrderItemDto>>(this.searchOrdersUrl.toString(), paginationOptionsDto)
      .pipe(
        map((response) =>
          this.pageMapper.mapPaginationFromDto<OrderItemDto, OrderItem>(
            response,
            this.orderMapper,
          ),
        ),
        catchError((error: HttpErrorResponse) => throwError(error)),
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
