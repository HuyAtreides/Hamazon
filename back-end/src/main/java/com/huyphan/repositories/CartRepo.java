package com.huyphan.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import com.huyphan.models.CartItem;
import com.huyphan.models.CartItemKey;

/** Cart repository. */
public interface CartRepo
		extends CrudRepository<CartItem, CartItemKey>, JpaRepository<CartItem, CartItemKey> {
	/**
	 * Find all cart items of a specific user.
	 * 
	 * @param username Username used to find cart items.
	 */
	List<CartItem> findAllByUsername(String username);
}
