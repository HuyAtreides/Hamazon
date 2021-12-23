package com.huyphan.models;

import org.springframework.stereotype.Component;

/** User token. */
@Component
public class Token {

	/** Token value. */
	private String value;

	public Token() {
	}

	public Token(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String token) {
		this.value = token;
	}
}
