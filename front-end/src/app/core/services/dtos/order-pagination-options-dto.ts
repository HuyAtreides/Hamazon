import { PaginationOptionsDto } from './pagination-options-dto';
import { SearchCriteriaDto } from './search-criteria-dto';

/** Order pagination options DTO. */
export interface OrderPaginationOptionsDto extends PaginationOptionsDto {
  /** Search criteria list. */
  readonly criteria: readonly SearchCriteriaDto<unknown>[];
}
