package com.huyphan.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.huyphan.models.AppError;

import io.jsonwebtoken.JwtException;

/** Handle exception thrown by all controllers. */
@RestControllerAdvice
public class ErrorHandler {

	/**
	 * Handle auth exception.
	 * 
	 * @param authExcetion. Auth exception to handle.
	 */
	@ExceptionHandler
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public AppError handleAuthException(AuthenticationException authException) {
		if (authException instanceof UsernameNotFoundException) {
			return new AppError(authException.getMessage());
		}

		if (authException instanceof BadCredentialsException) {
			return new AppError("Username or password is incorrect.");
		}

		return new AppError("Unauthorized.");
	}

	/**
	 * Handle jwt exception.
	 */
	@ExceptionHandler(value = JwtException.class)
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public AppError handleAuthException() {
		return new AppError("Invalid token");
	}

	/**
	 * Handles error caused by bad request.
	 * 
	 * @param error. Error to handle.
	 */
	@ExceptionHandler
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public AppError handleException(AppError error) {
		return error;
	}

	/** Handles internal server exception. */
	@ExceptionHandler(value = Exception.class)
	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
	public AppError handleException(Exception ex) {
		return new AppError("Something wrong happens. Please try again later.");
	}
}
