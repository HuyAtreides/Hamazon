import { AbstractControl } from '@angular/forms';

import { MonoTypeOperatorFunction } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

/** Filter all invalid form in a stream of form. */
export function filterInvalidForm<
  T extends AbstractControl,
>(): MonoTypeOperatorFunction<T> {
  return (source) =>
    source.pipe(
      tap((form) => form.markAllAsTouched()),
      filter((form) => form.valid),
    );
}
