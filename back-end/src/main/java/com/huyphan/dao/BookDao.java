package com.huyphan.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import com.huyphan.models.Book;

public interface BookDao extends SearchSpecificationContructor<Book>, CrudRepository<Book, Integer>,
		JpaSpecificationExecutor<Book> {
	/**
	 * Find all books that have author name or title or isbn matched pattern.
	 * 
	 * @param pattern Search pattern.
	 */
	@Query("select book from Book book "
			+ "where lower(book.title) like :pattern or lower(book.isbn) like :pattern or lower(book.author.name) like :pattern")
	List<Book> findByPattern(@Param("pattern") String pattern);
}
