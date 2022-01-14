package com.huyphan.dtos;

import com.huyphan.models.enums.ConstructorName;
import com.huyphan.models.enums.SearchCriteriaName;
import lombok.Getter;
import lombok.Setter;

/** Search criteria DTO. */
@Getter
@Setter
public class SearchCriteriaDto {

	/** Criteria name. */
	private SearchCriteriaName name;

	/** Construct which will use this search criteria to constructs Predicate. */
	private ConstructorName constructorName;

	/** Criteria value. */
	private Object value;
}
