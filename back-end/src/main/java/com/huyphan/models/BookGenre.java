package com.huyphan.models;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/** Acts as a join table for Book and Genre. */
@Getter
@Setter
@Entity
@Table(name = "Book_Genre")
public class BookGenre {

	/** Id. */
	@Id
	@GeneratedValue
	private int id;

	/** Book genre. */
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "Genre")
	private Genre genre;

	/** Book info. */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "Book_Id")
	private Book book;
}
