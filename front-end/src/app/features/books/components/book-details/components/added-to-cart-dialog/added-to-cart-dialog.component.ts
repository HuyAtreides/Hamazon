import { Component,  ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

/** Displays add to cart successfully message using material dialog. */
@Component({
  selector: 'app-added-to-cart-dialog',
  templateUrl: './added-to-cart-dialog.component.html',
  styleUrls: ['./added-to-cart-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddedToCartDialogComponent {

  public constructor(
    public dialogRef: MatDialogRef<AddedToCartDialogComponent>,
  ) {}

  /** Close dialog. */
  public handleCloseDialog(): void {
    this.dialogRef.close();
  }
}
