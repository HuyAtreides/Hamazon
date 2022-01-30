import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Book } from 'src/app/core/models/book';

/** A Dummy component used to display book info. */
@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookInfoComponent {
  /** Book to display. */
  @Input()
  public book!: Book;
}
