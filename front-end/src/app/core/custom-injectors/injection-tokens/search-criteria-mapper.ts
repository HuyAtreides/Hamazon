import { InjectionToken } from '@angular/core';

import { SearchCriteriaMapper } from '../../services/mappers/search-criteria-mapper';

export const SEARCH_CRITERIA_MAPPER = new InjectionToken<SearchCriteriaMapper<unknown>>(
  'searchCriteriaMapper',
);
