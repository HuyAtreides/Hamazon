import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, defer, Observable, of, race, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap } from 'rxjs/operators';

import { Token } from '../models/token';
import { User } from '../models/user';

import { AppConfigService } from './app-config.service';
import { UserDto } from './dtos/user-dto';
import { LocalStorageService } from './local-storage.service';
import { UserMapperService } from './mapper/user-mapper.service';

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
    private readonly localStorageService: LocalStorageService,
  ) {
    this.userUrl = new URL('auth/user', this.appConfig.apiUrl);
    this.currentToken$ = this.initTokenStream();
    this.currentUser$ = this.initUserStream();
  }

  /** Get current user. */
  public getCurrentUser(): Observable<User> {
    return this.http
      .get<UserDto>(this.userUrl.toString())
      .pipe(map((userDto) => this.userMapper.fromDto(userDto)));
  }

  /** Set new token.
   * @param newToken New token.
   */
  public setNewToken(newToken: Token | null): void {
    this.tokenChange$.next(newToken);
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

  /** Fetch user info whenever currentToken emits new value. */
  private initUserStream(): Observable<User | null> {
    return this.currentToken$.pipe(
      switchMap((token) => (token ? this.getCurrentUser() : of(null))),
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
  }
}
