import { SearchCriteriaName } from '../../enums/search-criteria-name';
import { SearchCriteriaUsageDescription } from '../../enums/search-criteria-usage-description';

/** Search criteria DTO. */
export interface SearchCriteriaDto {
  /** Search criteria name. */
  readonly name: SearchCriteriaName;

  /** Search criteria value. */
  readonly value: Object;

  /** Property required by the back-end.
   * A description of what this search criteria used for and also will be used by the back-end to create search query dynamically. */
  readonly constructorName: SearchCriteriaUsageDescription;
}
