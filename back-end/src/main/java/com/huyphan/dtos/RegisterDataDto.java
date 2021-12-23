package com.huyphan.dtos;

/** Register data DTO. */
public class RegisterDataDto {

	/** User email */
	private String email;

	/** Username */
	private String username;

	/** User password */
	private String password;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
