import { Component, ChangeDetectionStrategy, Input, DoCheck } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import {
  LengthErrorData,
  MatchErrorData,
  MaxValueErrorData,
  MinValueErrorData,
  ValidationErrorCode,
} from 'src/app/core/models/form-error-code';

/**
 * Validation error messages.
 */
const validationErrorMessageFactories = {
  [ValidationErrorCode.Email]: () => 'Email is not valid',
  [ValidationErrorCode.Required]: () => 'This field is required',
  [ValidationErrorCode.Match]: ({ controlTitle }: MatchErrorData) =>
    `Value does not match with "${controlTitle}"`,
  [ValidationErrorCode.MinLength]: ({ requiredLength }: LengthErrorData) =>
    `Minimal length is ${requiredLength}`,
  [ValidationErrorCode.MaxLength]: ({ requiredLength }: LengthErrorData) =>
    `Maximum length is ${requiredLength} characters`,
  [ValidationErrorCode.Pattern]: () => 'Value does not satisfy the pattern',
  [ValidationErrorCode.Min]: ({ min }: MinValueErrorData) => `Minimum value is ${min}`,
  [ValidationErrorCode.Max]: ({ max }: MaxValueErrorData) => `Maximum value is ${max}`,
  [ValidationErrorCode.InvalidEndDate]: () => 'Invalid end date',
  [ValidationErrorCode.InvalidStartDate]: () => 'Invalid start date',
  [ValidationErrorCode.InvalidDateRange]: () => 'Invalid date range',
};

/** Renders error message for the target form control. */
@Component({
  selector: 'app-form-control-validation-message',
  templateUrl: './form-control-validation-message.component.html',
  styleUrls: ['./form-control-validation-message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlValidationMessageComponent implements DoCheck {
  /** Target form control. */
  @Input()
  public control!: AbstractControl;

  /** Form error message. */
  public readonly errorMessage$ = new BehaviorSubject<string>('');

  /** @inheritdoc */
  public ngDoCheck(): void {
    if (this.shouldDisplayErrorMessage() && this.control.errors) {
      const errorCode = Object.keys(this.control.errors)[0] as ValidationErrorCode;
      const errorData = this.control.errors[errorCode];
      const factory = validationErrorMessageFactories[errorCode];
      if (factory != null) {
        this.errorMessage$.next(factory(errorData));
      } else {
        console.warn("Error code doesn't exist");
      }
    } else {
      this.errorMessage$.next('');
    }
  }

  /** Determines whether to displays error message or not. */
  private shouldDisplayErrorMessage(): boolean {
    const isFormDirty = this.control.dirty;
    const isFormTouched = this.control.touched;

    return isFormDirty || isFormTouched;
  }
}
