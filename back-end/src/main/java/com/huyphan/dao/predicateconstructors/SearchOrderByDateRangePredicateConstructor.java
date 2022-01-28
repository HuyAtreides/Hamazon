package com.huyphan.dao.predicateconstructors;

import java.time.LocalDate;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.springframework.stereotype.Component;
import com.huyphan.models.OrderItem;
import com.huyphan.models.enums.ConstructorName;

/** Constructs search book by date range predicate. */
@Component
public class SearchOrderByDateRangePredicateConstructor implements PredicateConstructor<OrderItem> {

	@Override
	public ConstructorName getConstructorName() {
		return ConstructorName.SearchOrderByDateRange;
	}

	@Override
	public Predicate constructPredicate(CriteriaBuilder criteriaBuilder, Root<OrderItem> root,
			Object criteriaValue) {
		LocalDate[] dateRange = (LocalDate[]) criteriaValue;
		LocalDate startDate = dateRange[0];
		LocalDate endDate = dateRange[1];
		Predicate orderPlacedInDateRange =
				criteriaBuilder.between(root.<LocalDate>get("placedIn"), startDate, endDate);

		return orderPlacedInDateRange;
	}

}
