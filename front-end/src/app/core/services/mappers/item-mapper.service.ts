import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { ItemDto } from '../dtos/item-dto';

import { BookMapperService } from './book-mapper.service';
import { IMapperFromDto, IMapperToDto } from './mapper';

/** Item mapper. */
@Injectable({
  providedIn: 'root',
})
export class ItemMapperService
  implements IMapperFromDto<ItemDto, Item>, IMapperToDto<ItemDto, Item>
{
  public constructor(private readonly bookMapper: BookMapperService) {}

  /** @inheritdoc */
  public toDto(data: Item): ItemDto {
    return {
      bookId: data.bookId,
      amount: data.amount,
      book: this.bookMapper.toDto(data.book),
    };
  }

  /** @inheritdoc */
  public fromDto(data: ItemDto): Item {
    return {
      bookId: data.bookId,
      amount: data.amount,
      book: this.bookMapper.fromDto(data.book),
    };
  }
}
