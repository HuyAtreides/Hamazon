import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip, switchMap, takeUntil } from 'rxjs/operators';
import { CartItem } from 'src/app/core/models/cart-item';
import { CustomErrorStateMatcher } from 'src/app/core/services/custom-error-state-matcher.service';
import { listenControlChanges } from 'src/app/core/utils/listen-control-changes';

/** Component controls cart item quantity. */
@Component({
  selector: 'app-cart-item-quantity',
  templateUrl: './cart-item-quantity.component.html',
  styleUrls: ['./cart-item-quantity.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemQuantityComponent implements OnChanges, OnDestroy {
  /** Cart item this component controls. */
  @Input()
  public cartItem!: CartItem;

  /** Whether the quantity form control should be disabled. */
  @Input()
  public isDisabled!: boolean | null;

  /** Update amount event. */
  @Output()
  public readonly updateAmount = new EventEmitter<CartItem>();

  /** Represents a quantity form control which can be changed over time. */
  public readonly quantityControl$ = new BehaviorSubject<FormControl>(
    this.instantiateQuantityControl(),
  );

  /** Emit value when this component is destroyed. */
  private readonly componentDestroyed$ = new Subject<void>();

  public constructor(public readonly errorStateMatcher: CustomErrorStateMatcher) {
    this.quantityControl$
      .pipe(
        takeUntil(this.componentDestroyed$),
        switchMap((quantityControl) =>
          listenControlChanges(quantityControl, undefined, 100).pipe(
            /** Skip the initial value of the form control. */
            skip(1),
          ),
        ),
      )
      .subscribe((newAmount) => {
        this.updateAmount.emit({ ...this.cartItem, amount: newAmount as number });
      });
  }

  /** @inheritdoc */
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.cartItem) {
      const { currentValue } = changes.cartItem;
      const { previousValue } = changes.cartItem;
      if (currentValue?.amount !== previousValue?.amount) {
        this.quantityControl$.next(this.instantiateQuantityControl(currentValue.amount));
      }
    }
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }

  private instantiateQuantityControl(initialValue?: number): FormControl {
    return new FormControl(initialValue, [Validators.required, Validators.min(1)]);
  }
}
