import { Component, ChangeDetectionStrategy } from '@angular/core';

/** Component for displaying a list of books. */
@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksListComponent {}
