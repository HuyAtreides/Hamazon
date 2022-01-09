import { Inject, Injectable } from '@angular/core';
import { SEARCH_CRITERIA_MAPPER } from 'src/app/core/custom-injectors/injection-tokens/search-criteria-mapper';
import { SearchCriteriaName } from 'src/app/core/enums/search-criteria-name';
import { AppError } from 'src/app/core/models/app-error';

import { SearchCriteriaMapper } from '../search-criteria-mapper';

/** Searches and returns a appropriate mapper for a specific search criteria. */
@Injectable({
  providedIn: 'root',
})
export class SearchCriteriaMapperFactoryService {
  public constructor(
    @Inject(SEARCH_CRITERIA_MAPPER)
    private readonly mappers: SearchCriteriaMapper<unknown>[],
  ) {}

  /** Get a appropriate mapper for a specific search criteria.
   * @param name The search criteria name used to search for mapper.
   */
  public getMapper(name: SearchCriteriaName): SearchCriteriaMapper<unknown> {
    for (const mapper of this.mappers) {
      if (mapper.getSearchCriteriaName() === name) {
        return mapper;
      }
    }

    throw new AppError('Search criteria mapper not found');
  }
}
