package com.huyphan.dao.predicateconstructors;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import com.huyphan.models.Book;
import com.huyphan.models.Genre;
import com.huyphan.models.enums.BookGenre;
import com.huyphan.models.enums.ConstructorName;

public class SearchBookByGenrePredicateConstructor implements PredicateConstructor<Book> {

	@Override
	public ConstructorName getConstructorName() {
		return ConstructorName.SearchBookByGenre;
	}

	@Override
	public Predicate constructPredicate(CriteriaBuilder criteriaBuilder, Root<Book> root,
			Object criteriaValue) {
		BookGenre genre = (BookGenre) criteriaValue;
		String queryGenre = genre.getValue();
		Join<Book, Genre> genres = root.join("genres");
		Predicate hasQueryGenre = criteriaBuilder.equal(genres.<String>get("genre"), queryGenre);
		return hasQueryGenre;
	}

}
