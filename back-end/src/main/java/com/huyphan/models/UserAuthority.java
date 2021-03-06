package com.huyphan.models;

import org.springframework.security.core.GrantedAuthority;

import com.huyphan.models.enums.Roles;

/** User authority. */
public class UserAuthority implements GrantedAuthority {

	private static final long serialVersionUID = 4424691375648195593L;

	/** {@inheritDoc} */
	@Override
	public String getAuthority() {
		return Roles.USER.name;
	}

}
