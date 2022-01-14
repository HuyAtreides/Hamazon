package com.huyphan.models;

import org.springframework.stereotype.Component;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** User token. */
@Getter
@Setter
@NoArgsConstructor
@Component
public class Token {

	/** Token value. */
	private String value;

	public Token(String value) {
		this.value = value;
	}
}
