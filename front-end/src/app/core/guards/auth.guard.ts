import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '../services/user.service';

/** Protects route from unauthenticated user. */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly userService: UserService,
    private readonly router: Router,
  ) {}

  /** Determine if the route can be activated. */
  public canActivate(): Observable<boolean | UrlTree> {
    return this.userService.currentToken$.pipe(
      map((token) => (token ? true : this.router.parseUrl('/auth/login'))),
    );
  }
}
