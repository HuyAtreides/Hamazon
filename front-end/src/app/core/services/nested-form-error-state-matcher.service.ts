import { Injectable } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error matcher used for nested form (multiple forms nested inside a single parent form, in this case we show error message when the parent form is invalid). */
@Injectable({
  providedIn: 'root',
})
export class NestedFormErrorStateMatcher implements ErrorStateMatcher {
  /** Determines when to show error message.
   * @param control The form control we are checking state.
   * @param formGroup The form control parent.
   */
  public isErrorState(
    control: FormControl | null,
    formGroup: FormGroupDirective | NgForm | null,
  ): boolean {
    return Boolean(
      (control?.invalid || formGroup?.invalid) && (control?.dirty || control?.touched),
    );
  }
}
