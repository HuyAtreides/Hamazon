package com.huyphan.models.enums;

import com.fasterxml.jackson.annotation.JsonValue;

/** Available criteria used for searching. */
public enum SearchCriteriaName {
	Text("text"), Genre("genre"), DateRange("date-range");

	private final String value;

	private SearchCriteriaName(String value) {
		this.value = value;
	}


	@JsonValue
	/** Return string value of this search criteria name. */
	public String getValue() {
		return value;
	}

}
