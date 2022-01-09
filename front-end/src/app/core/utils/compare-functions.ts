import { DateRange } from './types/date-range';

/** Provides compare function. Used to compare 2 values. */
export namespace CompareFunctions {
  /** Compare date range.
   * @param cur Current  date range.
   * @param prev Previous date range.
   */
  export function compareDateRange(cur: DateRange, prev: DateRange): boolean {
    const startDateNotChanges = cur.start?.getTime() === prev.start?.getTime();
    const endDateNotChanges = cur.end?.getTime() === prev.end?.getTime();
    return startDateNotChanges && endDateNotChanges;
  }

  /** Compare 2 strings.
   * @param s1 First string.
   * @param s2 Second string.
   */
  export function compareString(s1: string, s2: string): number {
    return s1.localeCompare(s2);
  }
}
