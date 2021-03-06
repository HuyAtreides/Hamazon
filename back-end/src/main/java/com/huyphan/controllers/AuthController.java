package com.huyphan.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.huyphan.dtos.AuthWrapperDto;
import com.huyphan.dtos.LoginDataDto;
import com.huyphan.dtos.RegisterDataDto;
import com.huyphan.dtos.TokenDto;
import com.huyphan.dtos.UpdateDataDto;
import com.huyphan.dtos.UserDto;
import com.huyphan.models.AppException;
import com.huyphan.models.User;
import com.huyphan.services.AuthService;
import com.huyphan.services.JwtService;
import com.huyphan.services.UserService;

/** Controller that handles authorization operations. */
@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private UserService userService;

	@Autowired
	private AuthService authService;

	@Autowired
	private JwtService jwtService;

	/**
	 * Handles login.
	 * 
	 * @param loginDataDto Data required for login.
	 */
	@PostMapping("/login")
	public TokenDto login(@RequestBody LoginDataDto loginDataDto) {
		User user = authService.login(loginDataDto);
		TokenDto tokenDto = jwtService.generateToken(user);

		return tokenDto;
	}

	/**
	 * Register new user.
	 * 
	 * @param registerDataDto Data required for register.
	 * @throws AppException
	 */
	@PostMapping("/register")
	public TokenDto register(@RequestBody RegisterDataDto registerDataDto) throws AppException {
		User user = userService.register(registerDataDto);
		TokenDto tokenDto = jwtService.generateToken(user);

		return tokenDto;
	}

	/** Get current authenticated user. */
	@GetMapping("/user")
	public UserDto getCurrentUser() {
		return userService.getCurrentUser();
	}

	/**
	 * Update user info.
	 * 
	 * @param authwrapperDto Auth wrapper contains updated user info.
	 * @throws AppException
	 */
	@PutMapping("/user")
	public TokenDto updateUserInfo(@RequestBody AuthWrapperDto<UpdateDataDto> authWrapperDto)
			throws AppException {
		User updatedUser = userService.updateUserInfo(authWrapperDto);
		return jwtService.generateToken(updatedUser);
	}

	/**
	 * Refresh token.
	 * 
	 * @param expiredTokenDto Expired token.
	 */
	@PostMapping("/refresh-token")
	public TokenDto refreshToken(@RequestBody TokenDto expiredTokenDto) {
		return jwtService.refreshToken(expiredTokenDto);
	}
}
