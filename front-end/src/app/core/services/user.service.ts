import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { concat, defer, Observable, of, race, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap } from 'rxjs/operators';

import { Token } from '../models/token';
import { User } from '../models/user';

import { AppConfigService } from './app-config.service';
import { UserDto } from './dtos/user-dto';
import { LocalStorageService } from './local-storage.service';
import { UserMapperService } from './mappers/user-mapper.service';

/**
 * Stateful service for storing/managing data about the current user.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  /** Current user info. */
  public readonly currentUser$: Observable<User | null>;

  /** Current token. */
  public readonly currentToken$: Observable<Token | null>;

  /** Emit new value whenever token change. */
  private readonly tokenChange$ = new ReplaySubject<Token | null>(1);

  /** User URL. */
  private readonly userUrl: URL;

  public constructor(
    private readonly appConfig: AppConfigService,
    private readonly userMapper: UserMapperService,
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService,
  ) {
    this.userUrl = new URL('auth/user', this.appConfig.apiUrl);
    this.currentToken$ = this.initTokenStream();
    this.currentUser$ = this.initUserStream();
  }

  /** Set new token.
   * @param newToken New token.
   */
  public setNewToken(newToken: Token | null): void {
    this.tokenChange$.next(newToken);
  }

  /** Logout. */
  public removeToken(): void {
    this.localStorageService.removeItem('token');
    this.tokenChange$.next(null);
  }

  /** Save token.
   * @param token Token to save.
   */
  public saveToken(token: Token): void {
    this.localStorageService.saveItem<Token>('token', token);
    this.tokenChange$.next(token);
  }

  /** Get token from local storage or tokenChange$. */
  private initTokenStream(): Observable<Token | null> {
    const tokenFromLocalStorage$ = concat(
      defer(() => of(this.localStorageService.getItem<Token>('token'))),
      this.tokenChange$,
    ).pipe(distinctUntilChanged((prev, cur) => prev?.value === cur?.value));

    return race(tokenFromLocalStorage$, this.tokenChange$).pipe(
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
  }

  /** Get current user. */
  private getCurrentUser(): Observable<User> {
    return this.http
      .get<UserDto>(this.userUrl.toString())
      .pipe(map((userDto) => this.userMapper.fromDto(userDto)));
  }

  /** Fetch user info whenever currentToken emits new value. */
  private initUserStream(): Observable<User | null> {
    return this.currentToken$.pipe(
      switchMap((token) => (token ? this.getCurrentUser() : of(null))),
      shareReplay(1),
    );
  }
}
