import { AbstractControl, ValidatorFn } from '@angular/forms';

import { ValidationErrorCode } from '../models/form-error-code';

export namespace CustomValidators {
  /**
   * Checks whether the current control value matches another.
   * @param controlName Control name to check matching with.
   * @param controlTitle Control title to display for a user.
   */
  export function matchControl(
    controlName: string,
    controlTitle: string = controlName,
  ): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.parent && control.parent.get(controlName)?.value !== control.value) {
        return {
          [ValidationErrorCode.Match]: {
            controlTitle,
          },
        };
      }

      return null;
    };
  }

  /** Validate date range form control. Valid if both start date and end date are provided or none of them are provided.
   * @param startDateControlName Name of start date control.
   * @param endDateControlName Name of end date control.
   */
  export function dateRangeControl(
    startDateControlName = 'start',
    endDateControlName = 'end',
  ): ValidatorFn {
    return (control: AbstractControl) => {
      const startDateControl = control.get(startDateControlName);
      const endDateControl = control.get(endDateControlName);
      if (startDateControl && endDateControl) {
        if (
          (startDateControl.value && endDateControl.value) ||
          (!startDateControl.value && !endDateControl.value)
        ) {
          return null;
        }

        return {
          [ValidationErrorCode.InvalidDateRange]: {},
        };
      }

      return null;
    };
  }
}
