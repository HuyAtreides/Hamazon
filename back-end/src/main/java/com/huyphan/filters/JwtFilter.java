package com.huyphan.filters;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.huyphan.models.AppException;
import com.huyphan.models.User;
import com.huyphan.services.UserService;
import com.huyphan.utils.JwtUtil;

/** Filter inspects and extracts token from HTTP authorization header. */
@Component
public class JwtFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private UserService userService;

	/** {@inheritDoc} */
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
			FilterChain filterChain)
			throws ServletException, IOException {
		try {
			String credential = request.getHeader(HttpHeaders.AUTHORIZATION);
			String token = parseCredential(credential);

			if (!jwtUtil.validateToken(token)) {
				throw new AppException("Invalid Token");
			}

			String subject = jwtUtil.getTokenSubjet(token);
			User user = userService.loadUserByUsername(subject);

			UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user,
					user.getPassword(), user.getAuthorities());
			SecurityContext context = SecurityContextHolder.getContext();
			context.setAuthentication(authentication);
			SecurityContextHolder.setContext(context);
			filterChain.doFilter(request, response);
		} catch (AppException error) {
			filterChain.doFilter(request, response);
		}
	}

	/**
	 * Get JWT token from credential.
	 * 
	 * @param credential. Credential contains JWT token.
	 * @throws AppException
	 */
	private String parseCredential(String credential) throws AppException {
		try {
			if (credential == null) {
				throw new AppException("Credential Is Missing.");
			}

			String authSchema = credential.split(" ")[0];
			String token = credential.split(" ")[1].strip();

			if (!authSchema.equals("Bearer")) {
				throw new AppException("Invalid Authorization Scheme.");
			}

			return token;
		} catch (ArrayIndexOutOfBoundsException exception) {
			throw new AppException("Invalid Token");
		}
	}

}
