/** Page DTO. */
export interface PageDto<T> {
  /** Page number (0-based). */
  readonly number: number;

  /** Total amount of elements. */
  readonly totalElements: number;

  /** Whether this page is the last one. */
  readonly last: boolean;

  /** Whether this page is the first one. */
  readonly first: boolean;

  /** Number of elements in this page. */
  readonly numberOfElements: number;

  /** Total pages. */
  readonly totalPages: number;

  /** Page content. */
  readonly content: readonly T[];
}
