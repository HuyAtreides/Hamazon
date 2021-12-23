import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError, switchMapTo } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { AppConfigService } from '../services/app-config.service';

/** Refresh token and retry the request if the token is expired. */
@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  public constructor(
    private readonly appConfig: AppConfigService,
    private readonly authService: AuthService,
  ) {}

  /** @inheritdoc */
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 401 || !this.shouldRefreshToken(request.url)) {
          return throwError(error);
        }

        return this.authService.refreshToken().pipe(switchMapTo(next.handle(request)));
      }),
    );
  }

  /** Determine whether to refresh the token for this url or not.
   * @param url Request url.
   */
  public shouldRefreshToken(url: string): boolean {
    const homeUrl = new URL('', this.appConfig.apiUrl);
    const isHomeUrl = url.startsWith(homeUrl.toString());
    return isHomeUrl;
  }
}
