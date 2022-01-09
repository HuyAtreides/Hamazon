import { BookOrderField } from '../enums/book-order-field';
import { OrderDirection } from '../enums/order-direction';

import { PaginationOptions } from './pagination-options';

/** Book pagination options. */
export interface BookPaginationOptions extends PaginationOptions {
  /** Order direction. */
  readonly orderDirection: OrderDirection;

  /** Field used to order books. */
  readonly orderField: BookOrderField;

  /** Search criteria list. */
  readonly searchCriteria: readonly unknown[];
}

export type BookSearchFormValues = Omit<BookPaginationOptions, 'page' | 'pageSize'>;
