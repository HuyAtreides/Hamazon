import { NonFunctional } from './types/non-functional';

/**
 * Helper to produce an array of enum values.
 * @param enumeration Enumeration object.
 */
export function enumToArray<T>(enumeration: T): NonFunctional<T[keyof T]>[] {
  return (
    Object.keys(enumeration)
      .filter((key) => isNaN(Number(key)))
      // Cast is valid since we've got a subset of enum keys here
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((key) => (enumeration as any)[key])
      .filter((val) => typeof val === 'number' || typeof val === 'string')
  );
}
