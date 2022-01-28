import { PaginationOptions } from './pagination-options';

/** Order pagination options. */
export interface OrderPaginationOptions extends PaginationOptions {
  /** Search criteria list. */
  readonly searchCriteria: readonly unknown[];
}
