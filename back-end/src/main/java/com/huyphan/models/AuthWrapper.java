package com.huyphan.models;

import lombok.Getter;
import lombok.Setter;

/**
 * A domain data wrapper. Contains user credential used by operations that requires user to
 * re-authenticate.
 */
@Getter
@Setter
public class AuthWrapper<T> {
	/** The data used for business logic. */
	private T payload;

	/** User credential which usually is user password. */
	private String credential;
}
