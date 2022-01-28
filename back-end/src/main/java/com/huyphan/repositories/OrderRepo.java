package com.huyphan.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import com.huyphan.models.OrderItem;

/** Order repo. */
public interface OrderRepo extends CrudRepository<OrderItem, Long>,
		SearchSpecificationContructor<OrderItem>, JpaSpecificationExecutor<OrderItem> {
	/**
	 * Find all orders of a specific user.
	 * 
	 * @param username Username used to find orders.
	 */
	List<OrderItem> findAllByUsername(String username);
}
