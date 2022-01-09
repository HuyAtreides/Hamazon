package com.huyphan.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.huyphan.dtos.BookDto;
import com.huyphan.dtos.BookPaginationOptionsDto;
import com.huyphan.dtos.PageDto;
import com.huyphan.services.BookService;

/** Handle operations related to books. */
@RestController
@RequestMapping("/books")
public class BooksController {


	@Autowired
	private BookService bookService;

	/**
	 * Search books.
	 * 
	 * @param bookPaginationOptionsDto. Book pagination options DTO.
	 */
	@PostMapping("/search")
	public PageDto<BookDto> searchBooks(
			@RequestBody BookPaginationOptionsDto bookPaginationOptionsDto) {
		return bookService.searchBooks(bookPaginationOptionsDto);
	}

	/**
	 * Return a list of books that matched the provided search string.
	 * 
	 * @param searchString Search string used to search for books.
	 */
	@GetMapping("/suggest")
	public List<BookDto> suggestsBook(@RequestParam String searchString) {
		return bookService.suggestBooks(searchString);
	}
}
