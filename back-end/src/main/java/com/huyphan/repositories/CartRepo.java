package com.huyphan.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
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
	@EntityGraph(value = "cart-item-graph")
	List<CartItem> findAllByUsername(String username);

	/**
	 * Delete all cart items of a specific user.
	 * 
	 * @param username Username used to delete cart items.
	 */
	void deleteAllByUsername(String username);
}
