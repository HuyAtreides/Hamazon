import { Component } from '@angular/core';

import { fadeOutTrigger } from './core/animations/fade-out';

import { RouteDataService } from './core/services/route-data.service';

/** Base app component. */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeOutTrigger],
})
export class AppComponent {
  public constructor(public readonly routeDataService: RouteDataService<string>) {}
}
