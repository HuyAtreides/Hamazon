package com.huyphan.exceptionhandlers;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.huyphan.models.AppError;

/** Handles authentication exception. */
@Component
public class AuthEntry implements AuthenticationEntryPoint {

	/** {@inheritDoc} */
	@Override
	public void commence(HttpServletRequest request,
			HttpServletResponse response, AuthenticationException authException)
			throws IOException, ServletException {

		response.setStatus(HttpStatus.UNAUTHORIZED.value());
		AppError appError = new AppError(authException.getMessage());
		ObjectMapper objectMapper = new ObjectMapper();
		response.setContentType("application/json");
		response.getWriter().write(objectMapper.writeValueAsString(appError));
	}

}
