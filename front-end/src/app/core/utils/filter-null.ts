import { Observable, OperatorFunction } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/**
 * Filter a stream value with undefined and null values and return the value wrapper into NonNullable util type.
 */
export function filterNull<T>(): OperatorFunction<T, NonNullable<T>> {
  return (source): Observable<NonNullable<T>> =>
    source.pipe(
      filter((val) => val != null),
      map((val) => val as NonNullable<T>),
    );
}
