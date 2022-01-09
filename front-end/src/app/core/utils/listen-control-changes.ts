import { AbstractControl } from '@angular/forms';
import { defer, Observable } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

export const DEFAULT_DEBOUNCE_TIME = 500;

/**
 * Listens control's `valueChanges` field.
 * Immediately starts with default value of the control.
 * Adds delay and emits value only if it was changed.
 * @param control Form control.
 * @param compare Function for distinctUntilChanged.
 * @param time Debounce time.
 */
export function listenControlChanges<T>(
  control: AbstractControl,
  compare?: (x: T, y: T) => boolean,
  time: number = DEFAULT_DEBOUNCE_TIME,
): Observable<T> {
  return defer(() =>
    control.valueChanges.pipe(
      filter(() => control.valid),
      startWith(control.value),
      debounceTime(time),
      distinctUntilChanged(compare),
    ),
  );
}
