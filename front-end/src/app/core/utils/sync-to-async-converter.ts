import { of } from 'rxjs';

import { Async } from './combine-latest-object';

/** Convert a sync object to async object.
 * @param targetObject Object needed to be converted.
 */
export function toAsync<T extends Record<string, unknown>>(targetObject: T): Async<T> {
  const keys = Object.keys(targetObject);

  return keys.reduce(
    (acc: Async<T>, key: string) => ({
      ...acc,
      [key]: of(targetObject[key]),
    }),
    {} as Async<T>,
  );
}
