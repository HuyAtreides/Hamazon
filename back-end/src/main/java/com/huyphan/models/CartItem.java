package com.huyphan.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Cart")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@IdClass(CartItemKey.class)
public class CartItem {

	/** Id of the book belongs to this cart. */
	@Id
	@Column(name = "Book_Id")
	private int bookId;

	/** Username of user who owns this cart. */
	@Id
	@Column(name = "Username")
	private String username;

	/** The amount of this cart item. */
	@Column(name = "Amount")
	private int amount;

	/** The book of this cart. */
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "Book_Id", insertable = false, updatable = false)
	private Book book;
}
