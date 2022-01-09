import { BookOrderField } from '../../enums/book-order-field';
import { OrderDirection } from '../../enums/order-direction';

import { PaginationOptionsDto } from './pagination-options-dto';
import { SearchCriteriaDto } from './search-criteria-dto';

/** Book pagination options DTO. */
export interface BookPaginationOptionsDto extends PaginationOptionsDto {
  /** Order direction. */
  readonly orderDirection: OrderDirection;

  /** Order field. */
  readonly orderField: BookOrderField;

  /** Search criteria list. */
  readonly criteria: readonly SearchCriteriaDto<unknown>[];
}
