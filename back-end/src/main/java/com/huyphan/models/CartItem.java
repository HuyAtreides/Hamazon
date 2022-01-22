package com.huyphan.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/** Represents a cart item. */
@Getter
@Setter
@Entity
@Table(name = "Cart")
@IdClass(CartItemKey.class)
public class CartItem {

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
