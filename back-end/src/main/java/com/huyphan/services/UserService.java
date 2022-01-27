package com.huyphan.services;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.huyphan.dtos.AuthWrapperDto;
import com.huyphan.dtos.RegisterDataDto;
import com.huyphan.dtos.UpdateDataDto;
import com.huyphan.dtos.UserDto;
import com.huyphan.mappers.AuthWrapperMapper;
import com.huyphan.mappers.RegisterDataMapper;
import com.huyphan.mappers.UpdateDataMapper;
import com.huyphan.mappers.UserMapper;
import com.huyphan.models.AppException;
import com.huyphan.models.AuthWrapper;
import com.huyphan.models.RegisterData;
import com.huyphan.models.UpdateData;
import com.huyphan.models.User;
import com.huyphan.repositories.UserRepo;

/** Service performs operations related to user. */
@Service
public class UserService implements UserDetailsService {

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserMapper userMapper;

	@Autowired
	private AuthWrapperMapper authWrapperMapper;

	@Autowired
	private UpdateDataMapper updateDataMapper;

	@Autowired
	private RegisterDataMapper registerDataMapper;

	/**
	 * Load user info by user name.
	 * 
	 * @param username Username used to find user.
	 */
	@Override
	public User loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> optionalUser = userRepo.findByUsernameOrEmail(username, username);
		if (optionalUser.isEmpty()) {
			throw new UsernameNotFoundException("Username is not found");
		}
		return optionalUser.get();
	}

	/**
	 * Register new user.
	 * 
	 * @param newUser New user.
	 * @throws AppException
	 */
	public User register(RegisterDataDto registerDataDto) throws AppException {
		RegisterData registerData = registerDataMapper.fromDto(registerDataDto);
		String username = registerData.getUsername();
		String email = registerData.getEmail();
		String password = registerData.getPassword();
		User newUser = new User();
		newUser.setEmail(email);
		newUser.setPassword(password);
		newUser.setUsername(username);
		Optional<User> optionalUser = userRepo.findByUsernameOrEmail(username, email);

		if (optionalUser.isPresent()) {
			throw new AppException("Username or Email is taken");
		}

		String encryptedPassword = passwordEncoder.encode(password);
		newUser.setPassword(encryptedPassword);
		return userRepo.save(newUser);
	}

	/** Get current authenticated user. */
	public UserDto getCurrentUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = (User) authentication.getPrincipal();

		return userMapper.toDto(user);
	}

	/**
	 * Update user info.
	 * 
	 * @throws AppException
	 */
	@Transactional
	public User updateUserInfo(AuthWrapperDto<UpdateDataDto> authWrapperDto) throws AppException {
		AuthWrapper<UpdateData> authWrapper =
				authWrapperMapper.fromDto(authWrapperDto, updateDataMapper);
		UpdateData updateData = authWrapper.getPayload();
		String username = getCurrentUser().getUsername();
		String updatedPassword = updateData.getPassword();
		User user = userRepo.findByUsername(username).get();

		validateUpdateData(authWrapper, user);

		user.setEmail(updateData.getEmail());

		if (!updatedPassword.isEmpty()) {
			user.setPassword(passwordEncoder.encode(updatedPassword));
		}
		user.setUsername(updateData.getUsername());
		return user;
	}

	private void validateUpdateData(AuthWrapper<UpdateData> authWrapper, User user)
			throws AppException {
		UpdateData updateData = authWrapper.getPayload();
		String updatedUsername = updateData.getUsername();
		String updatedEmail = updateData.getEmail();
		String currentUsername = user.getUsername();
		String currentEmail = user.getEmail();
		String credential = authWrapper.getCredential();

		if (!updatedUsername.equals(currentUsername)
				&& userRepo.existsByUsername(updatedUsername)) {
			throw new AppException("Username is taken");
		}

		if (!updatedEmail.equals(currentEmail) && userRepo.existsByEmail(updatedEmail)) {
			throw new AppException("Email is taken");
		}

		if (!passwordEncoder.matches(credential, user.getPassword())) {
			throw new AppException("Current password is incorrect");
		}
	}

}
