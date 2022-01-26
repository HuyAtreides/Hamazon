import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, defer, Observable, of, race, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap, tap } from 'rxjs/operators';

import { AuthWrapper } from '../models/auth-wrapper';

import { Token } from '../models/token';
import { UpdateData } from '../models/update-data';
import { User } from '../models/user';

import { AppConfigService } from './app-config.service';
import { TokenDto } from './dtos/token-dto';
import { UserDto } from './dtos/user-dto';
import { LocalStorageService } from './local-storage.service';
import { AuthWrapperMapperService } from './mappers/auth-wrapper-mapper.service';
import { TokenMapperService } from './mappers/token-mapper.service';
import { UpdateDataMapperService } from './mappers/update-data-mapper.service';
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
    private readonly tokenMapper: TokenMapperService,
    private readonly localStorageService: LocalStorageService,
    private readonly updateDataMapper: UpdateDataMapperService,
    private readonly authWrapperMapper: AuthWrapperMapperService,
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

  /** Update user info.
   * @param authWrapper An auth wrapper contains updated user info.
   */
  public updateUserInfo(authWrapper: AuthWrapper<UpdateData>): Observable<Token> {
    const authWrapperDto = this.authWrapperMapper.toDto(
      authWrapper,
      this.updateDataMapper,
    );

    return this.http.put<TokenDto>(this.userUrl.toString(), authWrapperDto).pipe(
      map((tokenDto) => this.tokenMapper.fromDto(tokenDto)),
      tap((token) => this.saveToken(token)),
    );
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
