import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Book } from 'src/app/core/models/book';
import { BookService } from 'src/app/core/services/book.service';

/** Displays a book details. */
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailsComponent {
  /** Represents a book. Null if there are some errors when fetching. */
  public readonly book$: Observable<Book | null>;

  public constructor(
    private readonly bookService: BookService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.book$ = this.route.paramMap.pipe(
      switchMap((param) => this.bookService.getBook(Number(param.get('id')))),
      catchError(() => this.router.navigate(['/books'])),
      map((value) => (typeof value !== 'boolean' ? value : null)),
    );
  }
}
