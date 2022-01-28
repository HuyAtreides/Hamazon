package com.huyphan.dao.predicateconstructors;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.springframework.stereotype.Component;
import com.huyphan.models.Book;
import com.huyphan.models.OrderItem;
import com.huyphan.models.enums.ConstructorName;

/** Constructs search book by text predicate. */
@Component
public class SearchOrderByTextPredicateConstructor implements PredicateConstructor<OrderItem> {

	@Override
	public ConstructorName getConstructorName() {
		return ConstructorName.SearchOrderByText;
	}

	@Override
	public Predicate constructPredicate(CriteriaBuilder criteriaBuilder, Root<OrderItem> root,
			Object criteriaValue) {
		String queryText = (String) criteriaValue;
		String pattern = "%" + queryText + "%";
		Path<Book> book = root.get("book");
		Predicate bookTitleMatchPattern = criteriaBuilder.like(book.get("title"), pattern);

		return bookTitleMatchPattern;
	}

}
