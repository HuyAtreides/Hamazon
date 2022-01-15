import { Injectable } from '@angular/core';

import { AppError } from '../../models/app-error';
import { CartItem } from '../../models/cart-item';
import { CartItemDto } from '../dtos/cart-item-dto';

import { BookMapperService } from './book-mapper.service';
import { IMapperFromDto, IMapperToDto } from './mapper';

/** Cart item mapper. */
@Injectable({
  providedIn: 'root',
})
export class CartItemMapperService
  implements IMapperFromDto<CartItemDto, CartItem>, IMapperToDto<CartItemDto, CartItem>
{
  public constructor(private readonly bookMapper: BookMapperService) {}

  /** @inheritdoc */
  public fromDto(data: CartItemDto): CartItem {
    if (data.book == null) {
      throw new AppError('Book property is required for cart item sent from server.');
    }

    return {
      book: this.bookMapper.fromDto(data.book),
      bookId: data.bookId,
      amount: data.amount,
    };
  }

  /** @inheritdoc */
  public toDto(data: CartItem): CartItemDto {
    return {
      bookId: data.bookId,
      amount: data.amount,
      book: this.bookMapper.toDto(data.book),
    };
  }
}
