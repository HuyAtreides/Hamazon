import { Book } from './book';

/** Represents a cart item. */
export interface CartItem {
  /** Id of the book belongs to this cart. */
  readonly bookId: number;

  /** The amount of this cart item. */
  readonly amount: number;

  /** The book of this cart. */
  readonly book: Book;
}
