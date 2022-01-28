import { Injectable } from '@angular/core';

import { SearchCriteriaName } from '../../enums/search-criteria-name';
import { SearchCriteriaUsageDescription } from '../../enums/search-criteria-usage-description';
import { SearchCriteria, SearchCriteriaInfo } from '../../models/search-criteria';
import { SearchCriteriaDto } from '../dtos/search-criteria-dto';

import { SearchCriteriaMapperFactoryService } from './factory/search-criteria-mapper-factory.service';
import { IMapperToDto } from './mapper';

/** Map from order search form value to criteria info.
 * The index of each element in this array has to match
 * the index of the element in the form value array.
 * */
const FORM_VALUE_TO_SEARCH_CRITERIA_INFO: readonly SearchCriteriaInfo[] = [
  {
    name: SearchCriteriaName.Text,
    usageDescription: SearchCriteriaUsageDescription.SearchOrderByText,
  },
  {
    name: SearchCriteriaName.DateRange,
    usageDescription: SearchCriteriaUsageDescription.SearchOrderByDateRange,
  },
];

/** Map values from search orders form field into search criteria. */
@Injectable({
  providedIn: 'root',
})
export class OrderSearchCriteriaMapperService
  implements IMapperToDto<SearchCriteriaDto<unknown>[], unknown[]>
{
  public constructor(
    private readonly mapperFactory: SearchCriteriaMapperFactoryService,
  ) {}

  /** @inheritdoc */
  public toDto(data: readonly unknown[]): SearchCriteriaDto<unknown>[] {
    return data
      .map((value, index) => {
        const searchCriteria: SearchCriteria = {
          ...FORM_VALUE_TO_SEARCH_CRITERIA_INFO[index],
          value,
        };
        return this.mapperFactory.getMapper(searchCriteria.name).toDto(searchCriteria);
      })
      .filter((searchCriteriaDto) => searchCriteriaDto.shouldInclude());
  }
}
