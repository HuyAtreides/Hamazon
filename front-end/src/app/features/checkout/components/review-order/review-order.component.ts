import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize, first, switchMap, takeUntil } from 'rxjs/operators';
import { Genre } from 'src/app/core/enums/genre';
import { CartItem } from 'src/app/core/models/cart-item';
import { ShippingAddress } from 'src/app/core/models/shipping-address';
import { CartService } from 'src/app/core/services/cart.service';
import { OrderService } from 'src/app/core/services/order.service';
import { ShippingAddressService } from 'src/app/core/services/shipping-address.service';
import { filterNull } from 'src/app/core/utils/filter-null';
import { handleError } from 'src/app/core/utils/handle-error';

/** Component allows user to review and place order. */
@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewOrderComponent implements OnDestroy {
  /** Emits event when the order is successfully placed. */
  @Output()
  public readonly orderPlaced = new EventEmitter<void>();

  /** List of cart item. */
  public readonly cartItems$: Observable<readonly CartItem[] | null>;

  /** Shipping address. */
  public readonly shippingAddress$: Observable<ShippingAddress | null>;

  /** Whether we are loading or not. */
  public readonly isLoading$ = new BehaviorSubject<boolean>(false);

  /** Error message. */
  public readonly errorMessage$ = new Subject<string>();

  /** Emits when this component is destroyed. */
  private readonly componentDestroyed$ = new Subject<void>();

  public constructor(
    private readonly cartService: CartService,
    private readonly shippingAddressService: ShippingAddressService,
    private readonly orderService: OrderService,
  ) {
    this.cartItems$ = this.cartService.cart$;
    this.shippingAddress$ = this.shippingAddressService.shippingAddress$;
  }

  /** Calculate order total price.
   * @param cartItems List of cart items.
   */
  public getOrderTotal(cartItems: readonly CartItem[]): number {
    return cartItems.reduce(
      (acc, cartItem) => acc + cartItem.amount * cartItem.book.price,
      0,
    );
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }

  /** Convert Genre enum to string used for display.
   * @param genre Genre enum to convert.
   */
  public toGenreReadable(genre: Genre): string {
    return Genre.toReadable(genre);
  }

  /** Handle place order. */
  public handlePlaceOrder(): void {
    this.isLoading$.next(true);
    this.cartItems$
      .pipe(
        filterNull(),
        first(),
        takeUntil(this.componentDestroyed$),
        switchMap((cartItems) => this.orderService.placeOrder(cartItems)),
        finalize(() => this.isLoading$.next(false)),
      )
      .subscribe({
        complete: () => this.orderPlaced.emit(),
        error: (err) => handleError(err, this.errorMessage$),
      });
  }
}
