import { Pipe, PipeTransform } from '@angular/core';

/** Pipe for sorting arrays using provided comparator. */
@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  /** @inheritdoc */
  public transform<T>(arr: readonly T[], comparator: (t1: T, t2: T) => number): T[] {
    return arr.slice().sort(comparator);
  }
}
