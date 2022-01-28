package com.huyphan.dao.predicateconstructors;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.springframework.stereotype.Component;
import com.huyphan.models.OrderItem;
import com.huyphan.models.enums.ConstructorName;

/** Constructs search book by username predicate. */
@Component
public class SearchOrderByUsernamePredicateConstructor implements PredicateConstructor<OrderItem> {

	@Override
	public ConstructorName getConstructorName() {
		return ConstructorName.SearchOrderByUsername;
	}

	@Override
	public Predicate constructPredicate(CriteriaBuilder criteriaBuilder, Root<OrderItem> root,
			Object criteriaValue) {
		String username = (String) criteriaValue;
		Predicate usernameMatched = criteriaBuilder.equal(root.<String>get("username"), username);

		return usernameMatched;

	}

}
