package com.huyphan.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/** Represents a book author. */
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getInfoUrl() {
		return infoUrl;
	}

	public void setInfoUrl(String infoUrl) {
		this.infoUrl = infoUrl;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
}
