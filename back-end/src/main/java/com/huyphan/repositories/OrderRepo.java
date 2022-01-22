package com.huyphan.repositories;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import com.huyphan.models.CartItemKey;
import com.huyphan.models.OrderItem;

/** Order repo. */
public interface OrderRepo extends CrudRepository<OrderItem, CartItemKey> {
	/**
	 * Find all orders of a specific user.
	 * 
	 * @param username Username used to find orders.
	 */
	List<OrderItem> findAllByUsername(String username);
}
