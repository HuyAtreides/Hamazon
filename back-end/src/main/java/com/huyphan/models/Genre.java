package com.huyphan.models;

import java.util.Set;
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
	@ManyToMany(mappedBy = "genres", fetch = FetchType.LAZY)
	private Set<Book> books;

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public Set<Book> getBooks() {
		return books;
	}

	public void setBooks(Set<Book> books) {
		this.books = books;
	}
}
