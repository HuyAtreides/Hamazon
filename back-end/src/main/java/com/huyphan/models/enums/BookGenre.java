package com.huyphan.models.enums;

import java.util.Arrays;
import com.huyphan.models.AppException;

/** Book genres. */
public enum BookGenre {
	Adventure("adventure"),
	History("history"),
	Horror("horror"),
	Travel("travel"),
	Art("art"),
	Business("business"),
	Mystery("mystery"),
	Fantasy("fantasy"),
	Thriller("thriller"),
	Comics("comics"),
	Manga("manga"),
	SciFi("science-fiction"),
	NonFiction("non-fiction"),
	Science("science"),
	Biography("biography");

	private final String value;

	private BookGenre(String value) {
		this.value = value;
	}

	/** Return string value of this genre. */
	public String getValue() {
		return value;
	}

	/**
	 * Converts string value to Genre object.
	 * 
	 * @throws AppException
	 */
	static public BookGenre toGenre(String value) throws AppException {
		return Arrays.stream(BookGenre.values()).filter(g -> g.getValue().equals(value)).findFirst()
				.orElseThrow(() -> new AppException("Genre doesn't exist."));
	}

}
