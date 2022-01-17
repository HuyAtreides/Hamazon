import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

/** Displays add to cart successfully message using material dialog. */
@Component({
  selector: 'app-added-to-cart-dialog',
  templateUrl: './added-to-cart-dialog.component.html',
  styleUrls: ['./added-to-cart-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddedToCartDialogComponent {
  public constructor(
    public dialogRef: MatDialogRef<AddedToCartDialogComponent>,
    public router: Router,
  ) {}

  /** Close dialog. */
  public handleCloseDialog(): void {
    this.dialogRef.close();
  }

  /** Go to cart page. */
  public handleGoToCart(): void {
    this.handleCloseDialog();
    this.router.navigate(['/cart']);
  }
}
