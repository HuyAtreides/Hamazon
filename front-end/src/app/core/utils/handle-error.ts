import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

import { AppError } from '../models/app-error';

/** Emit application error message.
 * @param error Application error.
 * @param message$ Subject contains error message.
 */
export function handleError(error: unknown, message$: Subject<string>): void {
  if (error instanceof AppError) {
    return message$.next(error.message);
  }

  if (error instanceof HttpErrorResponse) {
    if (error.error?.message) {
      return message$.next(error.error.message);
    }
  }

  return message$.next('Something wrong happens. Please try again later :((');
}
