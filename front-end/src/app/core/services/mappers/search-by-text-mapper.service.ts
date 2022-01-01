import { Injectable } from '@angular/core';

import { SearchCriteriaName } from '../../enums/search-criteria-name';
import { SearchCriteria } from '../../models/search-criteria';
import { SearchCriteriaDto } from '../dtos/search-criteria-dto';

import { SearchCriteriaMapper } from './search-criteria-mapper';

/** Map genre search criteria from domain model to DTO. */
@Injectable()
export class SearchByTextMapperService implements SearchCriteriaMapper {
  /** @inheritdoc */
  public getSearchCriteriaName(): SearchCriteriaName {
    return SearchCriteriaName.Genre;
  }

  /** @inheritdoc */
  public toDto(data: SearchCriteria): SearchCriteriaDto {
    return {
      name: data.name,
      value: data.value as string,
      constructorName: data.usageDescription,
    };
  }
}
