import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { catchError, first, map, mapTo, switchMap, tap } from 'rxjs/operators';

import { Router } from '@angular/router';

import { LoginData } from '../models/login-data';

import { Token } from '../models/token';

import { RegisterData } from '../models/register-data';

import { AppError } from '../models/app-error';

import { AppConfigService } from './app-config.service';
import { TokenDto } from './dtos/token-dto';
import { LoginDataMapperService } from './mappers/login-data-mapper.service';
import { TokenMapperService } from './mappers/token-mapper.service';
import { RegisterDataMapperService } from './mappers/register-data-mapper.service';
import { UserService } from './user.service';

/**
 * Stateful service for handling the authorization requests.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /** Login URL. */
  private readonly loginUrl: URL;

  /** Register URL. */
  private readonly registerUrl: URL;

  /** Refresh token URL. */
  private readonly refreshTokenUrl: URL;

  public constructor(
    private readonly appConfig: AppConfigService,
    private readonly http: HttpClient,
    private readonly loginDataMapper: LoginDataMapperService,
    private readonly tokenMapper: TokenMapperService,
    private readonly registerDataMapper: RegisterDataMapperService,
    private readonly userService: UserService,
    private readonly router: Router,
  ) {
    this.loginUrl = new URL('auth/login', this.appConfig.apiUrl);
    this.registerUrl = new URL('auth/register', this.appConfig.apiUrl);
    this.refreshTokenUrl = new URL('auth/refresh-token', this.appConfig.apiUrl);
  }

  /** Login.
   * @param loginData Data required for login.
   */
  public login(loginData: LoginData): Observable<Token> {
    const loginDataDto = this.loginDataMapper.toDto(loginData);
    return this.http.post<TokenDto>(this.loginUrl.toString(), loginDataDto).pipe(
      map((data) => this.tokenMapper.fromDto(data)),
      tap((token) => this.userService.saveToken(token)),
      catchError((error: HttpErrorResponse) => throwError(error)),
    );
  }

  /** Register new user.
   * @param registerData Required data for register.
   */
  public register(registerData: RegisterData): Observable<Token> {
    const registerDataDto = this.registerDataMapper.toDto(registerData);
    return this.http.post<TokenDto>(this.registerUrl.toString(), registerDataDto).pipe(
      map((data) => this.tokenMapper.fromDto(data)),
      tap((token) => this.userService.saveToken(token)),
      catchError((error: HttpErrorResponse) => throwError(error)),
    );
  }

  /** Refresh expired token. */
  public refreshToken(): Observable<void> {
    return this.userService.currentToken$.pipe(
      first(),
      switchMap((token) => {
        if (!token) {
          return throwError(new AppError('Unauthorized'));
        }

        const tokenDto = this.tokenMapper.toDto(token);

        return this.http.post<TokenDto>(this.refreshTokenUrl.toString(), tokenDto).pipe(
          map((newToken) => this.tokenMapper.fromDto(newToken)),
          tap((newToken) => this.userService.saveToken(newToken)),
        );
      }),
      catchError((error: HttpErrorResponse | AppError) => throwError(error)),
      mapTo(void 0),
    );
  }

  /** Logout. */
  public logout(): void {
    this.userService.removeToken();
  }
}
