/** Represents a page of data. */
export interface Page<T> {
  /** Page number (0-based). */
  readonly number: number;

  /** Total amount of elements. */
  readonly total: number;

  /** Whether this page is the last one. */
  readonly isLast: boolean;

  /** Whether this page is the first one. */
  readonly isFirst: boolean;

  /** Number of elements in this page. */
  readonly size: number;

  /** Total pages. */
  readonly totalPages: number;

  /** Page content. */
  readonly content: readonly T[];
}
