package com.huyphan.models;

import java.time.LocalDate;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/** Represents a book. */
@Entity
@Table(name = "Book")
public class Book {

	/** Book ISBN. */
	@Column(name = "ISBN", nullable = true)
	private String isbn;

	/** Uniquely identify a book. */
	@Id
	@Column(name = "Id", nullable = false)
	private int id;

	/** Book title. */
	@Column(name = "Title", nullable = false)
	private String title;

	/** Book price. */
	@Column(name = "Price", nullable = false)
	private double price;

	/** Book published date. */
	@Column(name = "Published", columnDefinition = "Date", nullable = false)
	private LocalDate published;

	/** Book pages number. */
	@Column(name = "Pages", nullable = false)
	private int pages;

	/** Publisher of this book. */
	@Column(name = "Publisher", nullable = false)
	private String publisher;

	/** Book cover image url. */
	@Column(name = "Image_URL", nullable = false)
	private String imageUrl;

	/** Book description. */
	@Column(name = "Description", nullable = false)
	private String description;


	/** Author of this book. */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "Author_Id")
	private Author author;

	/** Number of genres of this book. */
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "Book_Genre",
			joinColumns = @JoinColumn(name = "Book_Id", referencedColumnName = "Id"),
			inverseJoinColumns = @JoinColumn(name = "Genre", referencedColumnName = "Genre"))
	private List<Genre> genres;

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
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

	public LocalDate getPublished() {
		return published;
	}

	public void setPublished(LocalDate published) {
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

	public Author getAuthor() {
		return author;
	}

	public void setAuthor(Author author) {
		this.author = author;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public List<Genre> getGenres() {
		return genres;
	}

	public void setGenres(List<Genre> genres) {
		this.genres = genres;
	}

}
