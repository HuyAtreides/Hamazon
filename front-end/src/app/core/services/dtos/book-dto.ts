/** Book DTO. */
export interface BookDto {
  /** Book ISBN. */
  readonly isbn: number | null;

  /** Uniquely identify a book. */
  readonly id: number;

  /** Book title. */
  readonly title: string;

  /** Book price. */
  readonly price: number;

  /** Book published date. */
  readonly published: string;

  /** Book pages number. */
  readonly pages: number;

  /** Publisher of this book. */
  readonly publisher: string;

  /** Book cover image url. */
  readonly imageUrl: string;

  /** Book description. */
  readonly description: string;

  /** Book's author's name. */
  readonly authorName: string;

  /** Author info url. */
  readonly authorInfoUrl: string;

  /** Book genres. */
  readonly genres: readonly string[];
}
