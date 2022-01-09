import { Injectable } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Custom error state matcher. Use to override angular material error state matcher behavior. */
@Injectable({
  providedIn: 'root',
})
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  /** Determines when to show error message.
   * @param control The form control we are checking state.
   * @param _ The form control parent.
   */
  public isErrorState(
    control: FormControl | null,
    _: FormGroupDirective | NgForm | null,
  ): boolean {
    return Boolean(control?.invalid && (control?.dirty || control?.touched));
  }
}
