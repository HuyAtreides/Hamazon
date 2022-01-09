import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Book } from 'src/app/core/models/book';
import { BookSearchFormValues } from 'src/app/core/models/book-pagination-options';
import { BookService } from 'src/app/core/services/book.service';
import { Async, combineLatestObject } from 'src/app/core/utils/combine-latest-object';
import { paginate } from 'src/app/core/utils/paginate';
import { toAsync } from 'src/app/core/utils/sync-to-async-converter';

const PAGE_SIZE_OPTIONS = [10, 15, 25, 50, 100];

/** Component for displaying a list of books. */
@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksListComponent {
  /** Page index (0-based). */
  public readonly page$ = new BehaviorSubject<number>(0);

  /** Page size options. */
  public readonly pageSizeOptions = PAGE_SIZE_OPTIONS;

  /** Number of items per page. */
  public readonly pageSize$ = new BehaviorSubject<number>(15);

  /** Length of the total number of items that are being paginated. */
  public readonly length$ = new BehaviorSubject<number>(50);

  /** Represents a list of book. Null if not currently available. */
  public readonly books$: Observable<readonly Book[] | null>;

  /** Contains search form values. */
  private readonly formValues$ = new ReplaySubject<Async<BookSearchFormValues>>(1);

  public constructor(private readonly bookService: BookService) {
    this.books$ = this.formValues$.pipe(
      /** Reset page index whenever form values changed. */
      switchMap((asyncFormValues) =>
        combineLatestObject(asyncFormValues).pipe(tap(() => this.page$.next(0))),
      ),
      switchMap((syncFormValues) =>
        paginate(
          {
            ...toAsync(syncFormValues),
            page: this.page$.asObservable().pipe(distinctUntilChanged()),
            pageSize: this.pageSize$.asObservable().pipe(distinctUntilChanged()),
          },
          (options) => this.bookService.getBooks(options),
        ),
      ),
      tap((page) => {
        if (page) {
          this.length$.next(page.total);
        }
      }),
      map((page) => (page ? page.content : page)),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }

  /** Set form values stream.
   * @param formValues Form values stream.
   */
  public setFormValuesStream(formValues: Async<BookSearchFormValues>): void {
    this.formValues$.next(formValues);
  }

  /** Invoked when the user selects a different page size or navigates to another page.
   * @param pageEvent Contains pagination info (page index, page size, etc).
   */
  public handlePageEvent(pageEvent: PageEvent): void {
    this.page$.next(pageEvent.pageIndex);
    this.pageSize$.next(pageEvent.pageSize);
  }

  /**
   * Function to track book in array.
   * @param _ Idx.
   * @param book Item to track.
   */
  public trackBook(_: number, book: Book): number {
    return book.id;
  }
}
