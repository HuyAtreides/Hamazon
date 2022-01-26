package com.huyphan.repositories;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import com.huyphan.models.User;

/** User DAO. */
public interface UserRepo extends CrudRepository<User, Long> {

	/**
	 * Find user by username or email.
	 * 
	 * @param username Username.
	 * @param email User email.
	 */
	Optional<User> findByUsernameOrEmail(String username, String email);

	/**
	 * Find user by username
	 * 
	 * @param username Username.
	 * 
	 */
	Optional<User> findByUsername(String username);

	/**
	 * Check whether or not the user with provided username exists.
	 * 
	 * @param username Username to check.
	 */
	boolean existsByUsername(String username);

	/**
	 * Check whether or not the user with provided email exists.
	 * 
	 * @param username Email to check.
	 */
	boolean existsByEmail(String email);
}
