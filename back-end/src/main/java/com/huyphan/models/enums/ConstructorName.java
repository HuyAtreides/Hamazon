package com.huyphan.models.enums;

import com.fasterxml.jackson.annotation.JsonValue;

/** Predicate constructor name. */
public enum ConstructorName {
	SearchBookByText("search-book-by-text"),
	SearchBookByDateRange("search-book-by-date-range"),
	SearchBookByGenre("search-book-by-genre");

	private final String value;

	private ConstructorName(String value) {
		this.value = value;
	}

	/** Return string value of this predicate constructor name. */
	@JsonValue
	public String getValue() {
		return value;
	}

}
