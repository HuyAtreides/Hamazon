import { Injectable } from '@angular/core';

import { SearchCriteriaName } from '../../enums/search-criteria-name';
import { SearchCriteria } from '../../models/search-criteria';
import { SearchCriteriaDto } from '../dtos/search-criteria-dto';

import { SearchCriteriaMapper } from './search-criteria-mapper';

/** Map date range search criteria from domain model to DTO. */
@Injectable()
export class SearchByDateRangeMapperService implements SearchCriteriaMapper {
  /** @inheritdoc */
  public getSearchCriteriaName(): SearchCriteriaName {
    return SearchCriteriaName.DateRange;
  }

  /** @inheritdoc */
  public toDto(data: SearchCriteria): SearchCriteriaDto {
    const dateRange = data.value as Date[];
    const startDate = dateRange[0].toISOString().split('T');
    const endDate = dateRange[1].toISOString().split('T');

    return {
      name: data.name,
      value: [startDate, endDate],
      constructorName: data.usageDescription,
    };
  }
}
