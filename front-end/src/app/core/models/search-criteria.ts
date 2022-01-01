import { SearchCriteriaName } from '../enums/search-criteria-name';
import { SearchCriteriaUsageDescription } from '../enums/search-criteria-usage-description';

/** Represents a search criteria used to search for an item. */
export interface SearchCriteria {
  /** Name of the search criteria. */
  readonly name: SearchCriteriaName;

  /** Value of this search criteria. */
  readonly value: Object;

  /** Description of what this search criteria used for. */
  readonly usageDescription: SearchCriteriaUsageDescription;
}
