import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '../services/user.service';

/** Guard prevents user from accessing /auth route after logging in. */
@Injectable({
  providedIn: 'root',
})
export class AuthRouteGuard implements CanActivate {
  public constructor(
    private readonly userService: UserService,
    private readonly router: Router,
  ) {}

  /** Determine if /auth route can be activated. */
  public canActivate(): Observable<boolean | UrlTree> {
    return this.userService.currentUser$.pipe(
      map((user) => (user ? this.router.parseUrl('/books') : true)),
    );
  }
}
