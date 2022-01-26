import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

import { NavbarHeaderComponent } from './layouts/components/navbar-header/navbar-header.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'books',
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./features/checkout/checkout.module').then((m) => m.CheckoutModule),
  },
  {
    path: '',
    component: NavbarHeaderComponent,
    children: [
      {
        path: 'books',
        loadChildren: () =>
          import('./features/books/books.module').then((m) => m.BooksModule),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./features/cart/cart.module').then((m) => m.CartModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./features/user/user.module').then((m) => m.UserModule),
      },
    ],
    canActivate: [AuthGuard],
  },
];

/** Base app routing module. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
