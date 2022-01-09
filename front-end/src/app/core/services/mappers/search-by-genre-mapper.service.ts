import { Injectable } from '@angular/core';

import { Genre } from '../../enums/genre';

import { SearchCriteriaName } from '../../enums/search-criteria-name';
import { AppError } from '../../models/app-error';
import { SearchCriteria } from '../../models/search-criteria';
import { ExpectedTypeConverter } from '../../utils/expected-type-converter';
import { SearchByGenreDto } from '../dtos/search-by-genre-dto';
import { SearchCriteriaDto } from '../dtos/search-criteria-dto';

import { SearchCriteriaMapper } from './search-criteria-mapper';

/** Map genre search criteria from domain model to DTO. */
@Injectable()
export class SearchByGenreMapperService
  implements SearchCriteriaMapper<Genre | null>, ExpectedTypeConverter<Genre | null>
{
  /** @inheritdoc */
  public getSearchCriteriaName(): SearchCriteriaName {
    return SearchCriteriaName.Genre;
  }

  /** @inheritdoc */
  public toDto(data: SearchCriteria): SearchCriteriaDto<Genre | null> {
    const genre = this.convert(data.value);
    return new SearchByGenreDto({
      name: data.name,
      value: genre,
      constructorName: data.usageDescription,
    });
  }

  /** @inheritdoc */
  public convert(value: unknown): Genre | null {
    if (value === null) return value;
    if (typeof value === 'string') {
      if (Object.values(Genre).includes(value as Genre)) {
        return value as Genre;
      }
    }
    throw new AppError('Data is expected to be of type Genre');
  }
}
