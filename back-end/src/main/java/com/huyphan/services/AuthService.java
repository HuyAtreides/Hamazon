package com.huyphan.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.huyphan.dtos.LoginDataDto;
import com.huyphan.mappers.LoginDataMapper;
import com.huyphan.models.LoginData;
import com.huyphan.models.User;

/** Provide authentication services. */
@Service
public class AuthService {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private LoginDataMapper loginDataMapper;

	/**
	 * Login.
	 * 
	 * @param loginData Data required for login.
	 */
	public User login(LoginDataDto loginDataDto) {
		LoginData loginData = loginDataMapper.fromDto(loginDataDto);
		String username = loginData.getUsername();
		String password = loginData.getPassword();
		UsernamePasswordAuthenticationToken usernamePasswordAuthentication =
				new UsernamePasswordAuthenticationToken(username, password);
		Authentication authentication =
				authenticationManager.authenticate(usernamePasswordAuthentication);
		User user = (User) authentication.getPrincipal();
		return user;
	}

	/** Get current authenticated user. */
	public User getCurrentAuthenticatedUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = (User) authentication.getPrincipal();

		return user;
	}
}
