import { Component, ChangeDetectionStrategy } from '@angular/core';

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
})
export class UserComponent {
  /** List of tabs. */
  public readonly tabs: Tab[] = [Tab.Account, Tab.Orders, Tab.ShippingAddress];

  /** Return readable tab name.
   * @param tab Current tab.
   */
  public getReadableTabName(tab: Tab): string {
    return TO_READABLE_MAP[tab];
  }
}
