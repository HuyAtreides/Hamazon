import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { first, map, switchMap } from 'rxjs/operators';

import { AppConfigService } from '../services/app-config.service';

import { UserService } from '../services/user.service';

const AUTH_PREFIX = 'Bearer';

/** Interceptor that adds bearer token header to HTTP requests. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(
    private readonly appConfig: AppConfigService,
    private readonly userService: UserService,
  ) {}

  /** @inheritdoc */
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return this.userService.currentToken$.pipe(
      first(),
      map((token) =>
        token && this.shouldIntercept(request.url)
          ? request.clone({
              headers: request.headers.set(
                'Authorization',
                `${AUTH_PREFIX} ${token.value}`,
              ),
            })
          : request,
      ),
      switchMap((newRequest) => next.handle(newRequest)),
    );
  }

  /**
   * Determines whether to intercept this request or not base on the request url.
   * @param url Request url.
   */
  private shouldIntercept(url: string): boolean {
    const homeUrl = new URL('', this.appConfig.apiUrl);
    const isHomeRequest = url.startsWith(homeUrl.toString());
    return isHomeRequest;
  }
}
