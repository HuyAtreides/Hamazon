import { Injectable } from '@angular/core';
import { Data, RouterOutlet } from '@angular/router';

/** Service provides method for working with route data. */
@Injectable({
  providedIn: 'root',
})
export class RouteDataService<T> {
  /** Get the data of the route filled in the provided outlet.
   * @param outlet @see RouterOutlet.
   * @param key Used to receive the value associated with this key in the route data if provided otherwise return the route data.
   */
  public get(outlet: RouterOutlet, key?: string): Data | T {
    const data = outlet.activatedRouteData;
    if (key) {
      return data[key];
    }
    return data;
  }
}
