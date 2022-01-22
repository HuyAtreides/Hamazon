import { Injectable } from '@angular/core';

import { CartItem } from '../../models/cart-item';
import { CartItemDto } from '../dtos/cart-item-dto';

import { ItemMapperService } from './item-mapper.service';
import { IMapperFromDto, IMapperToDto } from './mapper';

/** Cart item mapper. */
@Injectable({
  providedIn: 'root',
})
export class CartItemMapperService
  implements IMapperFromDto<CartItemDto, CartItem>, IMapperToDto<CartItemDto, CartItem>
{
  public constructor(private readonly itemMapper: ItemMapperService) {}

  /** @inheritdoc */
  public fromDto(data: CartItemDto): CartItem {
    return {
      ...this.itemMapper.fromDto(data),
    };
  }

  /** @inheritdoc */
  public toDto(data: CartItem): CartItemDto {
    return {
      ...this.itemMapper.toDto(data),
    };
  }
}
