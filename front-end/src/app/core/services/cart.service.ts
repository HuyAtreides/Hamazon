import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, concat, Observable, of } from 'rxjs';
import { map, shareReplay, switchMapTo, tap } from 'rxjs/operators';

import { CartItem } from '../models/cart-item';

import { AppConfigService } from './app-config.service';
import { CartItemDto } from './dtos/cart-item-dto';
import { CartItemMapperService } from './mappers/cart-item-mapper.service';

/** A stateful service that saves and manages data related to shopping cart. */
@Injectable({
  providedIn: 'root',
})
export class CartService {
  /** Represents a user cart. */
  public readonly cart$: Observable<readonly CartItem[] | null>;

  /** Cart api url endpoint. */
  private readonly cartUrl: URL;

  /** Emits value when ever cart changed. */
  private readonly cartChanged$ = new BehaviorSubject<void>(void 0);

  public constructor(
    private readonly appConfig: AppConfigService,
    private readonly http: HttpClient,
    private readonly cartItemMapper: CartItemMapperService,
  ) {
    this.cartUrl = new URL('cart', this.appConfig.apiUrl);
    this.cart$ = this.initCartStream();
  }

  /** Add new cart item.
   * @param cartItem New cart item to add.
   */
  public addNewCartItem(cartItem: CartItem): Observable<readonly CartItem[]> {
    const body = this.cartItemMapper.toDto(cartItem);

    return this.http.post<readonly CartItemDto[]>(this.cartUrl.toString(), body).pipe(
      map((response) =>
        response.map((cartItemDto) => this.cartItemMapper.fromDto(cartItemDto)),
      ),
      tap(() => this.cartChanged$.next()),
    );
  }

  /** Update cart item.
   * @param updatedCartItem The updated cart item.
   */
  public updateCartItem(updatedCartItem: CartItem): Observable<void> {
    const body = this.cartItemMapper.toDto(updatedCartItem);

    return this.http
      .put<void>(this.cartUrl.toString(), body)
      .pipe(tap(() => this.cartChanged$.next()));
  }

  /** Delete all cart items. */
  public deleteAllCartItems(): Observable<void> {
    return this.http
      .delete<void>(this.cartUrl.toString())
      .pipe(tap(() => this.cartChanged$.next()));
  }

  /** Delete a specific cart item.
   * @param id Id used to delete a specific item.
   */
  public deleteCartItem(id: number): Observable<void> {
    const url = new URL(`cart/${id}`, this.appConfig.apiUrl);

    return this.http
      .delete<void>(url.toString())
      .pipe(tap(() => this.cartChanged$.next()));
  }

  /** Initialize a stream of cart value. */
  private initCartStream(): Observable<readonly CartItem[] | null> {
    return this.cartChanged$.pipe(
      switchMapTo(concat(of(null), this.getCart())),
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
  }

  /** Get user cart. */
  private getCart(): Observable<readonly CartItem[]> {
    return this.http
      .get<readonly CartItemDto[]>(this.cartUrl.toString())
      .pipe(
        map((response) =>
          response.map((cartItemDto) => this.cartItemMapper.fromDto(cartItemDto)),
        ),
      );
  }
}
