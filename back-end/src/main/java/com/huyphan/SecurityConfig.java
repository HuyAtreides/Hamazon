package com.huyphan;

import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import com.huyphan.exceptionhandlers.AuthEntry;
import com.huyphan.filters.JwtFilter;
import com.huyphan.services.UserService;

/** Web security configurations. */
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private AuthEntry authEntry;

	@Autowired
	private UserService userService;

	@Autowired
	private JwtFilter jwtFilter;

	/** {@inheritDoc} */
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userService);

	}

	/** {@inheritDoc} */
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable();

		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		http.authorizeRequests().antMatchers("/auth/register", "/auth/login", "/auth/refresh-token")
				.permitAll().anyRequest().authenticated();

		http.exceptionHandling().authenticationEntryPoint(authEntry);

		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
	}

	/** Custom cors configuration. */
	@Bean
	public CorsFilter corsFilter() {
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		UrlBasedCorsConfigurationSource configurationSource = new UrlBasedCorsConfigurationSource();
		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "DELETE", "PUT"));
		corsConfiguration.addAllowedHeader("*");
		corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
		configurationSource.registerCorsConfiguration("/**", corsConfiguration);
		return new CorsFilter(configurationSource);
	}

	/** {@inheritDoc} */
	@Override
	@Bean
	protected AuthenticationManager authenticationManager() throws Exception {
		return super.authenticationManager();
	}

}
