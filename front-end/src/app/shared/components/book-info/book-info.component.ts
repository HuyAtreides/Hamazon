import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Genre } from 'src/app/core/enums/genre';
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

  /** Font size to use. */
  @Input()
  public fontSize = 'inherit';

  /** Book cover image width. */
  @Input()
  public coverImgWidth = '130px';

  /** Book title font size. */
  @Input()
  public titleFontSize = 'auto';

  /** Convert Genre enum to string used for display.
   * @param genre Genre enum to convert.
   */
  public toReadableGenre(genre: Genre): string {
    return Genre.toReadable(genre);
  }
}
