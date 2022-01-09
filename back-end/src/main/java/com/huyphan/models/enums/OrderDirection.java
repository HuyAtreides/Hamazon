package com.huyphan.models.enums;

import com.fasterxml.jackson.annotation.JsonValue;

/** Order direction. */
public enum OrderDirection {
	Asc("asc"), Desc("desc");

	private String value;

	private OrderDirection(String value) {
		this.value = value;
	}

	@JsonValue
	public String getValue() {
		return value;
	}
}
