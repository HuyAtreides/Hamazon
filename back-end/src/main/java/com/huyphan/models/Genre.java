package com.huyphan.models;

import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/** Represent a book's genres. */
@Getter
@Setter
@Entity
@Table(name = "Genre")
public class Genre {

	/** String value of the genre. */
	@Id
	@Column(name = "Genre", nullable = false)
	private String value;

	/** List of book that contains this genre. */
	@ManyToMany(mappedBy = "genres", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	private Set<Book> books;
}
