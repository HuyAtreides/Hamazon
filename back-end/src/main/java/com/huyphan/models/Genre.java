package com.huyphan.models;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

/** Represent a book's genres. */
@Entity
@Table(name = "Genre")
@IdClass(value = GenreKey.class)
public class Genre {

	/** String value of the genre. */
	@Id
	@Column(name = "Genre")
	private String value;

	/** Id of the book this genre belongs to. */
	@Id
	@Column(name = "Book_Id")
	private int bookId;

	/** List of book that contains this genre. */
	@ManyToMany
	@JoinColumn(name = "Book_Id", insertable = false, updatable = false)
	private List<Book> books;

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public int getBookId() {
		return bookId;
	}

	public void setBookId(int bookId) {
		this.bookId = bookId;
	}

	public List<Book> getBooks() {
		return books;
	}

	public void setBooks(List<Book> books) {
		this.books = books;
	}
}
