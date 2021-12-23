package com.huyphan.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.huyphan.dao.UserDao;
import com.huyphan.dtos.RegisterDataDto;
import com.huyphan.dtos.UserDto;
import com.huyphan.mappers.RegisterDataMapper;
import com.huyphan.mappers.UserMapper;
import com.huyphan.models.AppError;
import com.huyphan.models.RegisterData;
import com.huyphan.models.User;

/** Service performs operations related to user. */
@Service
public class UserService implements UserDetailsService {

	@Autowired
	private UserDao userDao;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserMapper userMapper;

	@Autowired
	private RegisterDataMapper registerDataMapper;

	/**
	 * Load user info by user name.
	 * 
	 * @param username. Username used to find user.
	 */
	@Override
	public User loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> optionalUser = userDao.findById(username);

		if (optionalUser.isEmpty()) {
			throw new UsernameNotFoundException("Username is not found");
		}
		return optionalUser.get();
	}

	/**
	 * Register new user.
	 * 
	 * @param newUser. New user to register
	 * @throws AppError
	 */
	public User register(RegisterDataDto registerDataDto) throws AppError {
		RegisterData registerData = registerDataMapper.fromDto(registerDataDto);
		String username = registerData.getUsername();
		String email = registerData.getEmail();
		String password = registerData.getPassword();
		User newUser = new User();
		newUser.setEmail(email);
		newUser.setPassword(password);
		newUser.setUsername(username);
		User user = userDao.findByUsernameOrEmail(username, email);

		if (user != null) {
			throw new AppError("Username or Email is already taken");
		}

		String encryptedPassword = passwordEncoder.encode(password);
		newUser.setPassword(encryptedPassword);
		userDao.save(newUser);
		return newUser;
	}

	/** Get current authenticated user. */
	public UserDto getCurrentUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = (User) authentication.getPrincipal();

		return userMapper.toDto(user);
	}

}
