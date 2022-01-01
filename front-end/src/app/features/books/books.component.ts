import { Component, ChangeDetectionStrategy } from '@angular/core';

/** Books page. Allows users to searching books, view books info, etc. */
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent {}
