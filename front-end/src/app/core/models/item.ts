import { Book } from './book';

/**
 * Acts as a wrapper class for product (book). Adds extra properties such as amount which are
 * convenient for purchasing.
 */
export interface Item {
  /** Book id of this item. */
  readonly bookId: number;

  /** The amount of this item. */
  readonly amount: number;

  /** Uniquely identify an item. */
  readonly id?: number;

  /** The book of this item. */
  readonly book: Book;
}
