import { Injectable } from '@angular/core';

import { SearchCriteriaName } from '../../enums/search-criteria-name';
import { AppError } from '../../models/app-error';
import { SearchCriteria } from '../../models/search-criteria';
import { ExpectedTypeConverter } from '../../utils/expected-type-converter';
import { SearchByTextDto } from '../dtos/search-by-text-dto';
import { SearchCriteriaDto } from '../dtos/search-criteria-dto';

import { SearchCriteriaMapper } from './search-criteria-mapper';

/** Map genre search criteria from domain model to DTO. */
@Injectable()
export class SearchByTextMapperService
  implements SearchCriteriaMapper<string>, ExpectedTypeConverter<string>
{
  /** @inheritdoc */
  public getSearchCriteriaName(): SearchCriteriaName {
    return SearchCriteriaName.Text;
  }

  /** @inheritdoc */
  public toDto(data: SearchCriteria): SearchCriteriaDto<string> {
    const textSearch = this.convert(data.value);
    return new SearchByTextDto({
      name: data.name,
      value: textSearch,
      constructorName: data.usageDescription,
    });
  }

  /** @inheritdoc */
  public convert(value: unknown): string {
    if (typeof value !== 'string') {
      throw new AppError('Value is expected to be of type string');
    }
    return value as string;
  }
}
