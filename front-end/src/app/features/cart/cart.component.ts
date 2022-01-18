import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import {
  filter,
  finalize,
  map,
  shareReplay,
  switchMapTo,
  takeUntil,
} from 'rxjs/operators';
import { Genre } from 'src/app/core/enums/genre';
import { CartItem } from 'src/app/core/models/cart-item';
import { CartService } from 'src/app/core/services/cart.service';
import { handleError } from 'src/app/core/utils/handle-error';

/** Cart page. */
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnDestroy {
  /** User cart. Null if we are getting cart for the first time. */
  public readonly cart$: Observable<readonly CartItem[] | null>;

  /** Whether is loading or not. Used to display the loading state of whole cart. */
  public readonly isLoading$: Observable<boolean>;

  /** Contains the id of the loading cart item. Null if there is no loading cart item. */
  public readonly loadingCartItemId$ = new BehaviorSubject<number | null>(null);

  /** Error message. */
  public readonly errorMessage$ = new Subject<string>();

  /** Whether button is disabled or not. */
  public readonly isButtonDisabled$: Observable<boolean>;

  /** Emits value when this component is destroyed. */
  private readonly componentDestroyed$ = new Subject<void>();

  public constructor(private readonly cartService: CartService) {
    this.cart$ = of(null).pipe(
      switchMapTo(
        this.cartService.cart$.pipe(
          filter((value) => value != null),
          map((value) => [...(value as NonNullable<readonly CartItem[]>)]),
        ),
      ),
    );

    this.isLoading$ = this.cartService.cart$.pipe(
      /** Display loading state for the whole cart only when we are getting cart from server and there is no loading cart item. */
      map((value) => value == null && this.loadingCartItemId$.value == null),
    );

    this.isButtonDisabled$ = combineLatest([
      this.isLoading$,
      this.loadingCartItemId$,
    ]).pipe(
      map(([isLoading, loadingCartItemId]) => isLoading || loadingCartItemId != null),
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }

  /** Update cart item amount.
   * @param updatedCartItem The cart item which has the updated amount.
   */
  public handleUpdateCartItemAmount(updatedCartItem: CartItem): void {
    this.loadingCartItemId$.next(updatedCartItem.bookId);
    this.cartService
      .updateCartItem(updatedCartItem)
      .pipe(
        takeUntil(this.componentDestroyed$),
        finalize(() => this.loadingCartItemId$.next(null)),
      )
      .subscribe({ error: (err) => handleError(err, this.errorMessage$) });
  }

  /** Delete a specific cart item.
   * @param id Id of the cart item to be deleted.
   */
  public handleDeleteCartItem(id: number): void {
    this.cartService
      .deleteCartItem(id)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({ error: (err) => handleError(err, this.errorMessage$) });
  }

  /** Delete all cart items. */
  public handleDeleteAllCartItems(): void {
    this.cartService
      .deleteAllCartItems()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({ error: (err) => handleError(err, this.errorMessage$) });
  }

  /** Convert Genre enum to string used for display.
   * @param genre Genre enum to convert.
   */
  public toGenreReadable(genre: Genre): string {
    return Genre.toReadable(genre);
  }

  /** Returns string used to display number of items in this cart.
   * @param cartLength Length of the cart.
   */
  public displayNumberOfItems(cartLength: number): string {
    if (cartLength === 1) {
      return '1 item';
    }

    return `${cartLength} items`;
  }

  /** Calculate total price.
   * @param cartItems Contains all item in this cart.
   */
  public calculateTotalPrice(cartItems: readonly CartItem[]): number {
    return cartItems.reduce(
      (acc, cartItem) => acc + cartItem.amount * cartItem.book.price,
      0,
    );
  }

  /**
   * Function to track cart item in array.
   * @param _ Idx.
   * @param cartItem Item to track.
   */
  public trackCartItem(_: number, cartItem: CartItem): number {
    return cartItem.bookId;
  }
}
