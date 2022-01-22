import { BookDto } from './book-dto';

/** Item DTO. */
export interface ItemDto {
  /** Book id of this item. */
  readonly bookId: number;

  /** The amount of this item. */
  readonly amount: number;

  /** The book of this item. */
  readonly book: BookDto;
}
