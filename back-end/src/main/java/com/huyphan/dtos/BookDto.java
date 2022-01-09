package com.huyphan.dtos;

import java.util.List;

/** Book DTO. */
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

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getPublished() {
		return published;
	}

	public void setPublished(String published) {
		this.published = published;
	}

	public int getPages() {
		return pages;
	}

	public void setPages(int pages) {
		this.pages = pages;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getAuthorName() {
		return authorName;
	}

	public void setAuthorName(String authorName) {
		this.authorName = authorName;
	}

	public String getAuthorInfoUrl() {
		return authorInfoUrl;
	}

	public void setAuthorInfoUrl(String authorInfoUrl) {
		this.authorInfoUrl = authorInfoUrl;
	}

	public List<String> getGenres() {
		return genres;
	}

	public void setGenres(List<String> genres) {
		this.genres = genres;
	}

}
