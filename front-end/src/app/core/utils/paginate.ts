import { concat, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Page } from '../models/page';
import { PaginationOptions } from '../models/pagination-options';

import { Async, AsyncToSync, combineLatestObject } from './combine-latest-object';

/**
 * Allows paginating data based on provided object containing async properties for pagination.
 * @param asyncOptions Async objects with pagination data.
 * @param fetch Fetch function that accepts the pagination options.
 */
export function paginate<T, O extends PaginationOptions>(
  asyncOptions: Async<O>,
  fetch: (syncOptions: AsyncToSync<Async<O>>) => Observable<Page<T>>,
): Observable<Page<T> | null> {
  return combineLatestObject(asyncOptions).pipe(
    switchMap((options) => concat(of(null), fetch(options))),
  );
}
