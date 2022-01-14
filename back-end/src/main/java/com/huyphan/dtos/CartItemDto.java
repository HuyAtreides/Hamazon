package com.huyphan.dtos;

import lombok.Getter;
import lombok.Setter;

/** Cart item DTO. */
@Getter
@Setter
public class CartItemDto {

	/** Book id of the book belongs to this cart item. */
	private int bookId;

	/** The amount of this cart item. */
	private int amount;

	/** The book of this cart. */
	private BookDto bookDto;
}
