package com.huyphan.dtos;

import lombok.Getter;
import lombok.Setter;

/**
 * A domain data wrapper. Contains user password used for operations that requires user to
 * re-authenticate.
 */
@Getter
@Setter
public class AuthWrapperDto<T> {
	/** The data used for business logic. */
	private T payload;

	/** User credential which usually is user password. */
	private String credential;
}

