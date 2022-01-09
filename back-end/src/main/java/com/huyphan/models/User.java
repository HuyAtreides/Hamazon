package com.huyphan.models;

import java.util.Arrays;
import java.util.Collection;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/** Represents a user. */
@Table(name = "`User`")
@Entity
public class User implements UserDetails {

	private static final long serialVersionUID = -2861856731378779672L;

	/** Username. */
	@Id
	@Column(name = "Username", nullable = false)
	private String username;

	/** User email. */
	@Column(name = "Email", nullable = false)
	private String email;

	/** User password. */
	@Column(name = "Password", nullable = false)
	private String password;

	/** {@inheritDoc} */
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Arrays.asList(new UserAuthority());
	}

	/** {@inheritDoc} */
	@Override
	public String getPassword() {
		return password;
	}

	/** {@inheritDoc} */
	@Override
	public String getUsername() {
		return username;
	}

	/** {@inheritDoc} */
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	/** {@inheritDoc} */
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	/** {@inheritDoc} */
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	/** {@inheritDoc} */
	@Override
	public boolean isEnabled() {
		return true;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
