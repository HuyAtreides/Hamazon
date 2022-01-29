import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippingAddressComponent } from 'src/app/shared/components/shipping-address/shipping-address.component';

import { AccountComponent } from './components/account/account.component';
import { OrdersComponent } from './components/orders/orders.component';

import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'account',
      },
      {
        path: 'account',
        component: AccountComponent,
        data: { page: 'userAccount' },
      },
      {
        path: 'orders',
        component: OrdersComponent,
        data: { page: 'userOrders' },
      },
      {
        path: 'shipping-address',
        component: ShippingAddressComponent,
        data: { page: 'userShippingAddress' },
      },
    ],
  },
];

/** User feature routing module. */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
