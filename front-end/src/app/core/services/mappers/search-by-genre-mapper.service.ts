import { Injectable } from '@angular/core';

import { SearchCriteriaName } from '../../enums/search-criteria-name';
import { Genre } from '../../models/genre';
import { SearchCriteria } from '../../models/search-criteria';
import { SearchCriteriaDto } from '../dtos/search-criteria-dto';

import { GenreMapperService } from './genre-mapper.service';

import { SearchCriteriaMapper } from './search-criteria-mapper';

/** Map genre search criteria from domain model to DTO. */
@Injectable()
export class SearchByGenreMapperService implements SearchCriteriaMapper {
  public constructor(private readonly genreMapper: GenreMapperService) {}

  /** @inheritdoc */
  public getSearchCriteriaName(): SearchCriteriaName {
    return SearchCriteriaName.Genre;
  }

  /** @inheritdoc */
  public toDto(data: SearchCriteria): SearchCriteriaDto {
    return {
      name: data.name,
      value: this.genreMapper.toDto(data.value as Genre),
      constructorName: data.usageDescription,
    };
  }
}
