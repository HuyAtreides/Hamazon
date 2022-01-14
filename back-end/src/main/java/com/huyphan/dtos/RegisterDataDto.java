package com.huyphan.dtos;

import lombok.Getter;
import lombok.Setter;

/** Register data DTO. */
@Getter
@Setter
public class RegisterDataDto {

	/** User email */
	private String email;

	/** Username */
	private String username;

	/** User password */
	private String password;
}
