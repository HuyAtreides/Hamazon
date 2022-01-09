package com.huyphan.models.enums;

import com.fasterxml.jackson.annotation.JsonValue;

/** Available field for ordering books. */
public enum BookOrderField {
	Title("title"), Price("price"), PublicationDate("published");

	private String value;

	private BookOrderField(String value) {
		this.value = value;
	}

	/** Return string value of this enum. */
	@JsonValue
	public String getValue() {
		return value;
	}


}
