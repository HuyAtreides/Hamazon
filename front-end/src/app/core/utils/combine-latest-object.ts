import { combineLatest, Observable, ObservedValueOf } from 'rxjs';
import { map } from 'rxjs/operators';

/** Represents a object whose property value is a Observable. */
export type Async<T> = {
  readonly [K in keyof T]: Observable<T[K]>;
};

/** Represents the same object as Async<T>. But now it property value is the Observable's value. */
// any is intended so to infer types properly.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AsyncToSync<T extends Async<any>> = {
  readonly [K in keyof T]: ObservedValueOf<T[K]>;
};

/**
 * Works exactly like `combineLatest` but for objects. Polyfills behavior from rxjs 7.
 * @param sourceObject Object of observable sources.
 */
export function combineLatestObject<T extends Record<string, Observable<unknown>>>(
  sourceObject: T,
): Observable<AsyncToSync<T>> {
  const keys = Object.keys(sourceObject);

  return combineLatest(keys.map((k) => sourceObject[k])).pipe(
    map((values) =>
      values.reduce(
        (acc: AsyncToSync<T>, val, i) => ({
          ...acc,
          [keys[i]]: val,
        }),
        {} as AsyncToSync<T>,
      ),
    ),
  );
}
