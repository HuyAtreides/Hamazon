import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

/** Component collects current password from user. */
@Component({
  selector: 'app-current-password-dialog',
  templateUrl: './current-password-dialog.component.html',
  styleUrls: ['./current-password-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentPasswordDialogComponent {
  /** Current password form control. */
  public readonly passwordControl = new FormControl('');

  /** Whether the password is visible or not. */
  private readonly isPasswordVisible$ = new BehaviorSubject<boolean>(false);

  /** Toggle password visibility. */
  public togglePasswordVisibility(): void {
    this.isPasswordVisible$.next(!this.isPasswordVisible$.value);
  }

  /** Password input field type. */
  public get passwordInputType(): string {
    return this.isPasswordVisible$.value ? 'text' : 'password';
  }

  /** Password input field icon type. */
  public get passwordIconType(): string {
    return this.isPasswordVisible$.value ? 'visibility' : 'visibility_off';
  }
}
