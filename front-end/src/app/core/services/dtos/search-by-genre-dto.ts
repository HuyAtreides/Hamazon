import { Genre } from '../../enums/genre';

import { SearchCriteriaDto } from './search-criteria-dto';
/** Search by genre criteria DTO. */
export class SearchByGenreDto extends SearchCriteriaDto<Genre | null> {
  /** @inheritdoc */
  public shouldInclude(): boolean {
    return this.value != null;
  }
}
