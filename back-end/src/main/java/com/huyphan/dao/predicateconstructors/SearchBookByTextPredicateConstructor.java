package com.huyphan.dao.predicateconstructors;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.springframework.stereotype.Component;
import com.huyphan.models.Author;
import com.huyphan.models.Book;
import com.huyphan.models.enums.ConstructorName;

@Component
public class SearchBookByTextPredicateConstructor implements PredicateConstructor<Book> {


	@Override
	public ConstructorName getConstructorName() {
		return ConstructorName.SearchBookByText;
	}

	@Override
	public Predicate constructPredicate(CriteriaBuilder criteriaBuilder, Root<Book> root,
			Object criteriaValue) {
		Path<String> bookTitle = root.get("title");
		Path<String> isbn = root.get("isbn");
		Join<Book, Author> author = root.join("author");

		String queryText = (String) criteriaValue;

		Predicate bookTitleMatched = criteriaBuilder.equal(bookTitle, queryText);

		Predicate isbnMatched = criteriaBuilder.equal(isbn, queryText);

		Predicate authorNameMatched = criteriaBuilder.equal(author.<String>get("name"), queryText);

		Predicate isbnMatchedOrAuthorNameMatched =
				criteriaBuilder.or(isbnMatched, authorNameMatched);

		return criteriaBuilder.or(bookTitleMatched, isbnMatchedOrAuthorNameMatched);
	}

}
