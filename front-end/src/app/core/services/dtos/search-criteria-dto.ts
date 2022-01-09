import { SearchCriteriaName } from '../../enums/search-criteria-name';
import { SearchCriteriaUsageDescription } from '../../enums/search-criteria-usage-description';

type SearchCriteriaDtoConstructorData<T> = Omit<SearchCriteriaDto<T>, 'shouldInclude'>;

/** Search criteria DTO. */
export abstract class SearchCriteriaDto<T> {
  /** Search criteria name. */
  public readonly name: SearchCriteriaName;

  /** Search criteria value. */
  public readonly value: T;

  /** Property required by the back-end.
   * A description of what this search criteria used for. This property will be used by the back-end to create search query dynamically. */
  public readonly constructorName: SearchCriteriaUsageDescription;

  public constructor(data: SearchCriteriaDtoConstructorData<T>) {
    this.name = data.name;
    this.value = data.value;
    this.constructorName = data.constructorName;
  }

  /** Determine whether to include this criteria in the criteria array or not. */
  public abstract shouldInclude(): boolean;
}
