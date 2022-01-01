package com.huyphan.models;

import java.io.Serializable;
import java.util.Objects;

/** Genre composite primary key */
public class GenreKey implements Serializable {

	private static final long serialVersionUID = 1L;

	/** String value of this genre. */
	private String value;

	/** Id of the books this genre belongs to. */
	private int bookId;

	public String getValue() {
		return value;
	}

	public void setValue(String genre) {
		this.value = genre;
	}

	public int getBookId() {
		return bookId;
	}

	public void setBookId(int bookId) {
		this.bookId = bookId;
	}

	@Override
	public int hashCode() {
		return Objects.hash(bookId, value);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		GenreKey other = (GenreKey) obj;
		return bookId == other.bookId && Objects.equals(value, other.value);
	}


}
