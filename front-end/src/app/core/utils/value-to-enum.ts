import { AppError } from '../models/app-error';

import { NonFunctional } from './types/non-functional';

/** Convert a value to enum.
 * @param value The value to convert.
 * @param targetEnum The target enum we want to convert value to.
 */
export function toEnum<T>(value: unknown, targetEnum: T): NonFunctional<T[keyof T]> {
  const keys = Object.keys(targetEnum);
  for (const key of keys) {
    const enumKey = key as keyof T;
    if (targetEnum[enumKey] === value) {
      return targetEnum[enumKey] as NonFunctional<T[keyof T]>;
    }
  }
  throw new AppError(`Cannot convert ${value} to ${targetEnum}`);
}
