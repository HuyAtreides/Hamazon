package com.huyphan.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.huyphan.models.AppException;
import io.jsonwebtoken.JwtException;

/** Handle exception thrown by all controllers. */
@RestControllerAdvice
public class ControllersExceptionHandler {

	/**
	 * Handle auth exception.
	 * 
	 * @param authExcetion Auth exception to handle.
	 */
	@ExceptionHandler
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public AppException handleAuthException(AuthenticationException authException) {
		if (authException instanceof UsernameNotFoundException) {
			return new AppException(authException.getMessage());
		}

		if (authException instanceof BadCredentialsException) {
			return new AppException("Username or password is incorrect.");
		}

		return new AppException("Unauthorized.");
	}

	/**
	 * Handle jwt exception.
	 */
	@ExceptionHandler(value = JwtException.class)
	@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
	public AppException handleJwtException() {
		return new AppException("Invalid token");
	}

	/**
	 * Handles exception caused by bad request.
	 * 
	 * @param exception Exception to handle.
	 */
	@ExceptionHandler
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public AppException handleBadRequestException(AppException exception) {
		return exception;
	}

	/** Handles internal server exception. */
	@ExceptionHandler(value = Exception.class)
	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
	public AppException handleInternalException(Exception exception) {
		return new AppException("Something wrong happens. Please try again later.");
	}
}
