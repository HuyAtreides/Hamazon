import { SearchCriteriaDto } from './search-criteria-dto';

/** Search by text criteria DTO. */
export class SearchByTextDto extends SearchCriteriaDto<string> {
  /** @inheritdoc */
  public shouldInclude(): boolean {
    return this.value !== '';
  }
}
