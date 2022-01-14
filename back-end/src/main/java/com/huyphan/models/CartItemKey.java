package com.huyphan.models;

import java.io.Serializable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/** Composite key of Cart item entity. */
@Getter
@Setter
@EqualsAndHashCode
public class CartItemKey implements Serializable {
	private static final long serialVersionUID = -7128801166604142173L;

	/** Id of the book belongs to this cart. */
	private int bookId;

	/** Username of the person this cart belongs to. */
	private String username;
}

