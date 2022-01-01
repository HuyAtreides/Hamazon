package com.huyphan.dtos;

import com.huyphan.models.enums.ConstructorName;
import com.huyphan.models.enums.SearchCriteriaName;

/** Search criteria DTO. */
public class SearchCriteriaDto {

	/** Criteria name. */
	private SearchCriteriaName name;

	/** Entity type this search criteria used for. */
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

	public ConstructorName getEntityType() {
		return constructorName;
	}

	public void setEntityType(ConstructorName entityType) {
		this.constructorName = entityType;
	}
}
