package com.huyphan.models;

import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/** Represents a order item. */
@Getter
@Setter
@Entity
@Table(name = "`Order`")
public class OrderItem {
	/** Uniquely identify an order item. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Id")
	private Long id;

	/** Book id of this item. */
	@Column(name = "Book_Id", nullable = false)
	private int bookId;

	/** Username of user who this item belongs to. */
	@Column(name = "Username", nullable = false)
	private String username;

	/** The amount of this item. */
	@Column(name = "Amount", nullable = false)
	private int amount;

	/** Date at which this order item was placed. */
	@Column(name = "Order_Placed", columnDefinition = "Date", nullable = false)
	private LocalDate placedIn;

	/** The book of this item. */
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "Book_Id", insertable = false, updatable = false)
	private Book book;

	/** Shipping address of this order item. */
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "Shipping_Address_Id")
	private ShippingAddress shippingAddress;
}
