package com.huyphan.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/** Represents a book author. */
@Getter
@Setter
@Entity
@Table(name = "Author")
public class Author {

	/** Author name. */
	@Column(name = "Name", nullable = false)
	private String name;

	/** Author info url. */
	@Column(name = "INFO_URL", nullable = false)
	private String infoUrl;

	/** Uniquely identify a author. */
	@Id
	@Column(name = "Id", nullable = false)
	private String id;
}
