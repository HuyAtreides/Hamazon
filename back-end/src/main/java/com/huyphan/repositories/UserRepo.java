package com.huyphan.repositories;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import com.huyphan.models.User;

/** User DAO. */
public interface UserRepo extends CrudRepository<User, String> {

	/**
	 * Find user by username or email.
	 * 
	 * @param username Username.
	 * @param email User email.
	 */
	Optional<User> findByUsernameOrEmail(String username, String email);
}
