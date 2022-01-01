import { Injectable } from '@angular/core';

import { Genre } from '../../models/genre';
import { GenreDto } from '../dtos/genre-dto';

import { IMapperFromDto, IMapperToDto } from './mapper';

const TO_DTO_MAP: Readonly<Record<Genre, GenreDto>> = {
  [Genre.Art]: GenreDto.Art,
  [Genre.Biography]: GenreDto.Biography,
  [Genre.History]: GenreDto.History,
  [Genre.Horror]: GenreDto.Horror,
  [Genre.Travel]: GenreDto.Travel,
  [Genre.Art]: GenreDto.Art,
  [Genre.Business]: GenreDto.Business,
  [Genre.Mystery]: GenreDto.Mystery,
  [Genre.Fantasy]: GenreDto.Fantasy,
  [Genre.Thriller]: GenreDto.Thriller,
  [Genre.Comics]: GenreDto.Comics,
  [Genre.SciFi]: GenreDto.SciFi,
  [Genre.NonFiction]: GenreDto.NonFiction,
  [Genre.Science]: GenreDto.Science,
  [Genre.Biography]: GenreDto.Biography,
};

const FROM_DTO_MAP: Readonly<Record<GenreDto, Genre>> = {
  [GenreDto.Art]: Genre.Art,
  [GenreDto.Biography]: Genre.Biography,
  [GenreDto.History]: Genre.History,
  [GenreDto.Horror]: Genre.Horror,
  [GenreDto.Travel]: Genre.Travel,
  [GenreDto.Art]: Genre.Art,
  [GenreDto.Business]: Genre.Business,
  [GenreDto.Mystery]: Genre.Mystery,
  [GenreDto.Fantasy]: Genre.Fantasy,
  [GenreDto.Thriller]: Genre.Thriller,
  [GenreDto.Comics]: Genre.Comics,
  [GenreDto.SciFi]: Genre.SciFi,
  [GenreDto.NonFiction]: Genre.NonFiction,
  [GenreDto.Science]: Genre.Science,
  [GenreDto.Biography]: Genre.Biography,
};

/** Genre mapper. */
@Injectable({
  providedIn: 'root',
})
export class GenreMapperService
  implements IMapperFromDto<GenreDto, Genre>, IMapperToDto<GenreDto, Genre>
{
  /** @inheritdoc */
  public toDto(data: Genre): GenreDto {
    return TO_DTO_MAP[data];
  }

  /** @inheritdoc */
  public fromDto(data: GenreDto): Genre {
    return FROM_DTO_MAP[data];
  }
}
