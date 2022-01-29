import { Component, ChangeDetectionStrategy } from '@angular/core';
import { slideInTrigger } from 'src/app/core/animations/slide-in';
import { RouteDataService } from 'src/app/core/services/route-data.service';

/** Books page. Allows users to searching books, view books info, etc. */
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInTrigger],
})
export class BooksComponent {
  public constructor(public readonly routeDataService: RouteDataService<string>) {}
}
