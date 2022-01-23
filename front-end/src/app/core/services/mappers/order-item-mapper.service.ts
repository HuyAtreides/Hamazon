import { Injectable } from '@angular/core';

import { OrderItem } from '../../models/order-item';
import { OrderItemDto } from '../dtos/order-item-dto';

import { ItemMapperService } from './item-mapper.service';
import { IMapperFromDto, IMapperToDto } from './mapper';
import { ShippingAddressMapperService } from './shipping-address-mapper.service';

/** Order item mapper. */
@Injectable({
  providedIn: 'root',
})
export class OrderItemMapperService
  implements
    IMapperFromDto<OrderItemDto, OrderItem>,
    IMapperToDto<OrderItemDto, OrderItem>
{
  public constructor(
    private readonly itemMapper: ItemMapperService,
    private readonly shippingAddressMapper: ShippingAddressMapperService,
  ) {}

  /** @inheritdoc */
  public fromDto(data: OrderItemDto): OrderItem {
    return {
      ...this.itemMapper.fromDto(data),
      placedIn: new Date(data.placedIn),
      shippingAddress: this.shippingAddressMapper.fromDto(data.shippingAddress),
    };
  }

  /** @inheritdoc */
  public toDto(data: OrderItem): OrderItemDto {
    return {
      ...this.itemMapper.toDto(data),
      placedIn: data.placedIn.toISOString().split('T')[0],
      shippingAddress: this.shippingAddressMapper.toDto(data.shippingAddress),
    };
  }
}
