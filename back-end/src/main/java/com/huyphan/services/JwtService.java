package com.huyphan.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.huyphan.dtos.TokenDto;
import com.huyphan.mappers.TokenMapper;
import com.huyphan.models.Token;
import com.huyphan.models.User;
import com.huyphan.utils.JwtUtil;

import io.jsonwebtoken.Claims;

/** Provides services related to JWT. */
@Service
public class JwtService {

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private TokenMapper tokenMapper;

	@Autowired
	private UserService userService;

	/**
	 * Generate JWT token based on user info.
	 * 
	 * @param user. User info.
	 */
	public TokenDto generateToken(User user) {
		String tokenValue = jwtUtil.generateToken(user);
		Token token = new Token(tokenValue);
		return tokenMapper.toDto(token);
	}

	/**
	 * Refresh token.
	 * 
	 * @param expiredToken. Expired token.
	 */
	public TokenDto refreshToken(TokenDto expiredTokenDto) {
		Token expiredToken = tokenMapper.fromDto(expiredTokenDto);
		Claims claims = jwtUtil.parseExpiredToken(expiredToken.getValue());
		String username = claims.getSubject();
		User user = userService.loadUserByUsername(username);
		return generateToken(user);
	}

}
