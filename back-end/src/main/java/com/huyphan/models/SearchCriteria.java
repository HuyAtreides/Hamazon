package com.huyphan.models;

import com.huyphan.models.enums.ConstructorName;
import com.huyphan.models.enums.SearchCriteriaName;
import lombok.Getter;
import lombok.Setter;

/** Searching criteria. */
@Getter
@Setter
public class SearchCriteria {

	/** Value used by this criteria to filter query results. */
	private Object value;

	/** Criteria name. */
	private SearchCriteriaName name;

	/** Construct which will use this search criteria to constructs Predicate. */
	private ConstructorName constructorName;
}
