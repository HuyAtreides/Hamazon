package com.huyphan.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import com.huyphan.models.OrderItem;

/** Order repo. */
public interface OrderRepo extends CrudRepository<OrderItem, Long>,
		SearchSpecificationContructor<OrderItem>, JpaSpecificationExecutor<OrderItem> {

	/** {@inheritDoc} */
	@Override
	@EntityGraph(value = "order-item-graph")
	Page<OrderItem> findAll(Specification<OrderItem> spec, Pageable pageable);
}
