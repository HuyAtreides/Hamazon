import { Injectable } from '@angular/core';

import { SearchCriteriaName } from '../../enums/search-criteria-name';
import { AppError } from '../../models/app-error';
import { SearchCriteria } from '../../models/search-criteria';
import { ExpectedTypeConverter } from '../../utils/expected-type-converter';
import { DateRange } from '../../utils/types/date-range';
import { SearchByDateRangeDto } from '../dtos/search-by-date-range-dto';
import { SearchCriteriaDto } from '../dtos/search-criteria-dto';

import { SearchCriteriaMapper } from './search-criteria-mapper';

/** Map date range search criteria from domain model to DTO. */
@Injectable()
export class SearchByDateRangeMapperService
  implements SearchCriteriaMapper<(string | null)[]>, ExpectedTypeConverter<DateRange>
{
  /** @inheritdoc */
  public getSearchCriteriaName(): SearchCriteriaName {
    return SearchCriteriaName.DateRange;
  }

  /** @inheritdoc */
  public toDto(data: SearchCriteria): SearchCriteriaDto<(string | null)[]> {
    const dateRange = this.convert(data.value);
    const startDate = dateRange.start?.toISOString().split('T')[0];
    const endDate = dateRange.end?.toISOString().split('T')[0];
    return new SearchByDateRangeDto({
      name: data.name,
      value: [startDate ? startDate : null, endDate ? endDate : null],
      constructorName: data.usageDescription,
    });
  }

  /** @inheritdoc */
  public convert(value: unknown): DateRange {
    const dateRange = value as DateRange;

    if (
      Object.keys(dateRange).includes('start') &&
      Object.keys(dateRange).includes('end')
    ) {
      return dateRange;
    }

    throw new AppError('Value is expected to be of type DateRange.');
  }
}
