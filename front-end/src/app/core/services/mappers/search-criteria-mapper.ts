import { SearchCriteriaName } from '../../enums/search-criteria-name';
import { SearchCriteria } from '../../models/search-criteria';
import { SearchCriteriaDto } from '../dtos/search-criteria-dto';

import { IMapperToDto } from './mapper';

/** Mapper that maps search criteria from domain model to DTO. */
export interface SearchCriteriaMapper
  extends IMapperToDto<SearchCriteriaDto, SearchCriteria> {
  /** Returns the search criteria name that this mapper corresponds to. */
  getSearchCriteriaName(): SearchCriteriaName;
}
