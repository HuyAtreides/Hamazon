package com.huyphan.dtos;

import com.huyphan.models.enums.ConstructorName;
import com.huyphan.models.enums.SearchCriteriaName;

/** Search criteria DTO. */
public class SearchCriteriaDto {

	/** Criteria name. */
	private SearchCriteriaName name;

	/** Construct which will use this search criteria to constructs Predicate. */
	private ConstructorName constructorName;

	/** Criteria value. */
	private Object value;

	public SearchCriteriaName getName() {
		return name;
	}

	public Object getValue() {
		return value;
	}

	public void setValue(Object value) {
		this.value = value;
	}

	public void setName(SearchCriteriaName name) {
		this.name = name;
	}

	public ConstructorName getConstructorName() {
		return constructorName;
	}

	public void setConstructorName(ConstructorName constructorName) {
		this.constructorName = constructorName;
	}
}
