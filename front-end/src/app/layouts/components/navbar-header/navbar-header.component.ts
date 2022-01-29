import { Component, ChangeDetectionStrategy } from '@angular/core';
import { slideInTrigger } from 'src/app/core/animations/slide-in';
import { RouteDataService } from 'src/app/core/services/route-data.service';

/** Layout wrapper contains navbar header with navigation links. */
@Component({
  selector: 'app-navbar-header',
  templateUrl: './navbar-header.component.html',
  styleUrls: ['./navbar-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInTrigger],
})
export class NavbarHeaderComponent {
  public constructor(public readonly routeDataService: RouteDataService<string>) {}
}
