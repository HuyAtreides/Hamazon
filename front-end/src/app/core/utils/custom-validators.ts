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
}
