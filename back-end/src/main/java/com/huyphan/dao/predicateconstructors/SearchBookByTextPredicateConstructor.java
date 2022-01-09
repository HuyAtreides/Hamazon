package com.huyphan.dao.predicateconstructors;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.springframework.stereotype.Component;
import com.huyphan.models.Author;
import com.huyphan.models.Book;
import com.huyphan.models.enums.ConstructorName;

/** Constructs search book by text predicate. */
@Component
public class SearchBookByTextPredicateConstructor implements PredicateConstructor<Book> {

	/** {@inheritDoc} */
	@Override
	public ConstructorName getConstructorName() {
		return ConstructorName.SearchBookByText;
	}

	/** {@inheritDoc} */
	@Override
	public Predicate constructPredicate(CriteriaBuilder criteriaBuilder, Root<Book> root,
			Object criteriaValue) {
		Path<String> bookTitle = root.get("title");
		Path<String> isbn = root.get("isbn");
		Join<Book, Author> author = root.join("author");

		String queryText = (String) criteriaValue;

		String pattern = "%" + queryText.toLowerCase() + "%";

		Expression<String> lowerCaseBookTitle = criteriaBuilder.lower(bookTitle);

		Predicate bookTitleMatched = criteriaBuilder.like(lowerCaseBookTitle, pattern);

		Predicate isbnMatched = criteriaBuilder.like(isbn, pattern);

		Predicate authorNameMatched = criteriaBuilder.like(author.<String>get("name"), pattern);

		Predicate isbnMatchedOrAuthorNameMatched =
				criteriaBuilder.or(isbnMatched, authorNameMatched);

		return criteriaBuilder.or(bookTitleMatched, isbnMatchedOrAuthorNameMatched);
	}

}
