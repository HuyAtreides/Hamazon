package com.huyphan.dtos;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

/** Book DTO. */
@Getter
@Setter
public class BookDto {
	/** Book ISBN. */
	private String isbn;

	/** Uniquely identify a book. */
	private int id;

	/** Book title. */
	private String title;

	/** Book price. */
	private double price;

	/** Book published date. */
	private String published;

	/** Book pages number. */
	private int pages;

	/** Publisher of this book. */
	private String publisher;

	/** Book cover image url. */
	private String imageUrl;

	/** Book description. */
	private String description;


	/** Book's author's name. */
	private String authorName;

	/** Author info url. */
	private String authorInfoUrl;

	/** Book genres. */
	private List<String> genres;
}
