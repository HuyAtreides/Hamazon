package com.huyphan.models;

import com.huyphan.models.enums.ConstructorName;
import com.huyphan.models.enums.SearchCriteriaName;

/** Searching criteria. */
public class SearchCriteria {

	/** Value used by this criteria to filter query results. */
	private Object value;

	/** Criteria name. */
	private SearchCriteriaName name;

	/** Entity type this search criteria used for. */
	private ConstructorName constructorName;


	public Object getValue() {
		return value;
	}

	public void setValue(Object value) {
		this.value = value;
	}

	public SearchCriteriaName getName() {
		return name;
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
