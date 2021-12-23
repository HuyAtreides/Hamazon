package com.huyphan.dao;

import org.springframework.data.repository.CrudRepository;

import com.huyphan.models.User;

/** User DAO. */
public interface UserDao extends CrudRepository<User, String> {

	User findByUsernameOrEmail(String username, String email);
}
