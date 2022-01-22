package com.huyphan.models;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

/**
 * Acts as a wrapper class for product (book). Adds extra properties such as amount which are
 * convenient for purchasing.
 */
@Getter
@Setter
@MappedSuperclass
@IdClass(CartItemKey.class)
public abstract class Item {
	/** Book id of this item. */
	@Id
	@Column(name = "Book_Id", nullable = false)
	private int bookId;

	/** Username of user who this item belongs to. */
	@Id
	@Column(name = "Username", nullable = false)
	private String username;

	/** The amount of this item. */
	@Column(name = "Amount", nullable = false)
	private int amount;

	/** The book of this item. */
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "Book_Id", insertable = false, updatable = false)
	private Book book;
}
