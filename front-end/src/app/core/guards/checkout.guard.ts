import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CartService } from '../services/cart.service';
import { filterNull } from '../utils/filter-null';

/** Prevents users from accessing checkout route when their cart is empty.  */
@Injectable({
  providedIn: 'root',
})
export class CheckoutGuard implements CanActivate {
  public constructor(
    private readonly cartService: CartService,
    private readonly router: Router,
  ) {}

  /** Determine whether the checkout route can be activated or not. */
  public canActivate(): Observable<boolean | UrlTree> {
    return this.cartService.cart$.pipe(
      filterNull(),
      map((value) => (value.length > 0 ? true : this.router.parseUrl('/cart'))),
    );
  }
}
