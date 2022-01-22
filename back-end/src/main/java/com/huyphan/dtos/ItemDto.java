package com.huyphan.dtos;

import lombok.Getter;
import lombok.Setter;

/** Item DTO. */
@Getter
@Setter
public abstract class ItemDto {
	/** Book id of this item. */
	private int bookId;

	/** The amount of this item. */
	private int amount;

	/** The book of this item. */
	private BookDto book;
}
