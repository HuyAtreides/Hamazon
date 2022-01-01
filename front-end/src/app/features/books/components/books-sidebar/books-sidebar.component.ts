import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

/** Allows users to specific books searching options (i.e. Search by books name, search by genres, etc). */
@Component({
  selector: 'app-books-sidebar',
  templateUrl: './books-sidebar.component.html',
  styleUrls: ['./books-sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksSidebarComponent {
  /** Book genres. */
  public readonly GENRES = [
    'Art',
    'Biography',
    'Business',
    'Comics',
    'Fantasy',
    'History',
    'Horror',
    'Mystery',
    'Non-Fiction',
    'Science',
    'Science-Fiction',
    'Thriller',
    'Travel',
  ];

  /** */
  public readonly range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
}
