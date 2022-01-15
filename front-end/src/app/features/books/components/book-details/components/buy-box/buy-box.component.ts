import { Component, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { Book } from 'src/app/core/models/book';
import { CartService } from 'src/app/core/services/cart.service';
import { CustomErrorStateMatcher } from 'src/app/core/services/custom-error-state-matcher.service';
import { handleError } from 'src/app/core/utils/handle-error';

import { AddedToCartDialogComponent } from '../added-to-cart-dialog/added-to-cart-dialog.component';

/** Represents a box where user can use to add item to cart or buy item. */
@Component({
  selector: 'app-buy-box',
  templateUrl: './buy-box.component.html',
  styleUrls: ['./buy-box.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyBoxComponent implements OnDestroy {
  /** Book info. */
  @Input()
  public book!: Book;

  /** Control buy box form. */
  public readonly buyBoxControl = this.formBuilder.group({
    quantity: [1, [Validators.min(1), Validators.required]],
  });

  /** Error message. */
  public readonly errorMessage$ = new Subject<string>();

  /** Whether is loading or not. */
  public readonly isLoading$ = new BehaviorSubject<boolean>(false);

  /** Emits value when this component is destroyed. */
  private readonly componentDestroyed$ = new Subject<void>();

  public constructor(
    private readonly formBuilder: FormBuilder,
    public readonly errorStateMatcher: CustomErrorStateMatcher,
    private readonly cartService: CartService,
    private readonly dialog: MatDialog,
  ) {}

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }

  /** Calculate total price. */
  public get totalPrice(): number {
    if (this.buyBoxControl.invalid) {
      return this.book.price;
    }
    const quantity = this.buyBoxControl.controls.quantity.value;
    return this.book.price * quantity;
  }

  /** Add new cart item. */
  public handleAddNewCartItem(): void {
    this.buyBoxControl.markAllAsTouched();
    if (!this.buyBoxControl.valid) {
      return;
    }
    const amount = this.buyBoxControl.controls.quantity.value as number;
    this.isLoading$.next(true);
    this.cartService
      .addNewCartItem({
        bookId: this.book.id,
        amount,
        book: this.book,
      })
      .pipe(
        takeUntil(this.componentDestroyed$),
        finalize(() => this.isLoading$.next(false)),
      )
      .subscribe({
        complete: () => this.dialog.open(AddedToCartDialogComponent),
        error: (err) => handleError(err, this.errorMessage$),
      });
  }
}
