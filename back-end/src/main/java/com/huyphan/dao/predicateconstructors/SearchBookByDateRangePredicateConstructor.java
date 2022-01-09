package com.huyphan.dao.predicateconstructors;

import java.time.LocalDate;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.springframework.stereotype.Component;
import com.huyphan.models.Book;
import com.huyphan.models.enums.ConstructorName;

/** Constructs search book by date range predicate. */
@Component
public class SearchBookByDateRangePredicateConstructor implements PredicateConstructor<Book> {

	/** {@inheritDoc} */
	@Override
	public ConstructorName getConstructorName() {
		return ConstructorName.SearchBookByDateRange;
	}

	/** {@inheritDoc} */
	@Override
	public Predicate constructPredicate(CriteriaBuilder criteriaBuilder, Root<Book> root,
			Object criteriaValue) {
		LocalDate[] dateRange = (LocalDate[]) criteriaValue;
		LocalDate startDate = dateRange[0];
		LocalDate endDate = dateRange[1];
		Predicate publishedInDateRange =
				criteriaBuilder.between(root.<LocalDate>get("published"), startDate, endDate);

		return publishedInDateRange;
	}

}
