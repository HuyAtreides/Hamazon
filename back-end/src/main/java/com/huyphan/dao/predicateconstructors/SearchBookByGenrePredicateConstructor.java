package com.huyphan.dao.predicateconstructors;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.springframework.stereotype.Component;
import com.huyphan.models.Book;
import com.huyphan.models.Genre;
import com.huyphan.models.enums.BookGenre;
import com.huyphan.models.enums.ConstructorName;

/** Constructs search book by genre predicate. */
@Component
public class SearchBookByGenrePredicateConstructor implements PredicateConstructor<Book> {

	/** {@inheritDoc} */
	@Override
	public ConstructorName getConstructorName() {
		return ConstructorName.SearchBookByGenre;
	}

	/** {@inheritDoc} */
	@Override
	public Predicate constructPredicate(CriteriaBuilder criteriaBuilder, Root<Book> root,
			Object criteriaValue) {
		String queryGenre = ((BookGenre) criteriaValue).getValue();
		Join<Book, Genre> genre = root.join("genres");
		Predicate hasQueriedGenre = criteriaBuilder.equal(genre.<String>get("value"), queryGenre);
		return hasQueriedGenre;
	}

}
