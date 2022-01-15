package com.huyphan.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.huyphan.dao.predicateconstructors.factory.PredicateConstructorFactory;
import com.huyphan.dtos.BookDto;
import com.huyphan.dtos.BookPaginationOptionsDto;
import com.huyphan.dtos.PageDto;
import com.huyphan.mappers.BookMapper;
import com.huyphan.mappers.BookPaginationOptionsMapper;
import com.huyphan.mappers.PageMapper;
import com.huyphan.models.AppException;
import com.huyphan.models.Book;
import com.huyphan.models.BookPaginationOptions;
import com.huyphan.models.SearchCriteria;
import com.huyphan.models.enums.OrderDirection;
import com.huyphan.repositories.BookRepo;
import com.huyphan.utils.DirectionConverter;

/** Service performs operations related to book. */
@Service
public class BookService {

	@Autowired
	private PredicateConstructorFactory<Book> constructorFactory;

	@Autowired
	private BookPaginationOptionsMapper paginationOptionsMapper;

	@Autowired
	private BookRepo bookDao;

	@Autowired
	private BookMapper bookMapper;

	@Autowired
	private DirectionConverter directionConverter;

	@Autowired
	private PageMapper<BookDto, Book> pageMapper;

	/**
	 * Search books.
	 * 
	 * @param paginationOptionsDto Contains pagination options (i.e. page number, page size, etc).
	 */
	@Transactional(readOnly = true)
	public PageDto<BookDto> searchBooks(BookPaginationOptionsDto paginationOptionsDto) {
		BookPaginationOptions paginationOptions =
				paginationOptionsMapper.fromDto(paginationOptionsDto);
		int page = paginationOptions.getPage();
		int pageSize = paginationOptions.getPageSize();
		OrderDirection orderDirection = paginationOptions.getOrderDirection();
		Direction direction = directionConverter.convertToDirection(orderDirection);
		Sort sort = Sort.by(direction, paginationOptions.getOrderField().getValue());
		Pageable pageable = PageRequest.of(page, pageSize, sort);
		List<SearchCriteria> criteriaList = paginationOptions.getCriteria();
		Specification<Book> spec = bookDao.getSpecification(criteriaList, constructorFactory);
		Page<Book> pageResult = bookDao.findAll(spec, pageable);
		return pageMapper.toDto(pageResult, bookMapper);
	}

	/**
	 * Suggests books that matches the provided search string.
	 * 
	 * @param searchString Search string used to suggests books.
	 */
	@Transactional(readOnly = true)
	public List<BookDto> suggestBooks(String searchString) {
		String pattern = "%" + searchString.toLowerCase() + "%";
		List<Book> books = bookDao.findByPattern(pattern);
		return books.stream().map(book -> bookMapper.toDto(book)).collect(Collectors.toList());
	}

	/**
	 * Get a specific book.
	 * 
	 * @param id Book id.
	 * @throws AppException
	 */
	public BookDto getBook(int id) throws AppException {
		Optional<Book> optionalBook = bookDao.findById(id);
		if (optionalBook.isEmpty()) {
			throw new AppException("Book not found");
		}
		return bookMapper.toDto(optionalBook.get());
	}
}
