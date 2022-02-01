package com.huyphan.repositories;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import com.huyphan.models.Book;

/** Book repository. */
public interface BookRepo extends SearchSpecificationContructor<Book>,
		CrudRepository<Book, Integer>, JpaSpecificationExecutor<Book> {
	/**
	 * Find all books that have author name or title or isbn matched pattern.
	 * 
	 * @param pattern Search pattern.
	 */
	@Query("select distinct book from Book book join fetch book.genres join fetch book.author "
			+ "where lower(book.title) like :pattern or lower(book.isbn) like :pattern or lower(book.author.name) like :pattern")
	List<Book> findByPattern(@Param("pattern") String pattern);

	/** {@inheritDoc} */
	@Override
	@EntityGraph(value = "book-graph")
	Page<Book> findAll(Specification<Book> spec, Pageable pageable);
}
