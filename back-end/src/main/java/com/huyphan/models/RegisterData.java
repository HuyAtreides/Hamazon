package com.huyphan.models;

import lombok.Getter;
import lombok.Setter;

/** Data required for register. */
@Getter
@Setter
public class RegisterData {

	/** Username. */
	private String username;

	/** User email. */
	private String email;

	/** User password. */
	private String password;
}
