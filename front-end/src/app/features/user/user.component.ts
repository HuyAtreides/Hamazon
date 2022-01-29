import { Component, ChangeDetectionStrategy } from '@angular/core';
import { slideInTrigger } from 'src/app/core/animations/slide-in';
import { RouteDataService } from 'src/app/core/services/route-data.service';

/** Name of tab. */
enum Tab {
  Account = 'account',
  Orders = 'orders',
  ShippingAddress = 'shipping-address',
}

const TO_READABLE_MAP: Readonly<Record<Tab, string>> = {
  [Tab.Account]: 'Account',
  [Tab.Orders]: 'Orders',
  [Tab.ShippingAddress]: 'Shipping Address',
};

/** User home page. */
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInTrigger],
})
export class UserComponent {
  /** List of tabs. */
  public readonly tabs: Tab[] = [Tab.Account, Tab.Orders, Tab.ShippingAddress];

  public constructor(public readonly routeDataService: RouteDataService<string>) {}

  /** Return readable tab name.
   * @param tab Current tab.
   */
  public getReadableTabName(tab: Tab): string {
    return TO_READABLE_MAP[tab];
  }
}
