import { SearchCriteriaDto } from './search-criteria-dto';
/** Search by date range criteria DTO. */
export class SearchByDateRangeDto extends SearchCriteriaDto<(string | null)[]> {
  /** @inheritdoc */
  public shouldInclude(): boolean {
    return this.value[0] !== null && this.value[1] !== null;
  }
}
