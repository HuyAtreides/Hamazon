package com.huyphan.models;

import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

/** Represent a book's genres. */
@Entity
@Table(name = "Genre")
public class Genre {

	/** String value of the genre. */
	@Id
	@Column(name = "Genre", nullable = false)
	private String value;

	/** List of book that contains this genre. */
	@ManyToMany(mappedBy = "genre", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	private Set<BookGenre> books;

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public Set<BookGenre> getBooks() {
		return books;
	}

	public void setBooks(Set<BookGenre> books) {
		this.books = books;
	}
}
