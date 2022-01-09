/** Pagination options DTO. */
export interface PaginationOptionsDto {
  /** Number of items per page. */
  readonly pageSize: number;

  /** Page number (start from 0). */
  readonly page: number;
}
