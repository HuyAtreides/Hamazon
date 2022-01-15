import { BookDto } from './book-dto';

/** Cart item DTO. */
export interface CartItemDto {
  /** Id of the book belongs to this cart. */
  readonly bookId: number;

  /** The amount of this cart item. */
  readonly amount: number;

  /** The book of this cart. */
  readonly book: BookDto;
}
