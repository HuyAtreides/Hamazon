package com.huyphan.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/** Contains info required for delivery. */
@Getter
@Setter
@Entity
@Table(name = "Shipping_Address")
public class ShippingAddress {
	/** Uniquely identify a shipping address. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Id")
	private Long id;

	/** User full name. */
	@Column(name = "Fullname", nullable = false)
	private String fullname;

	/** User country. */
	@Column(name = "Country", nullable = false)
	private String country;

	/** User phone number. */
	@Column(name = "Phone_Number", nullable = false)
	private String phoneNumber;

	/** User address. */
	@Column(name = "Address", nullable = false)
	private String address;

	/** User city. */
	@Column(name = "City", nullable = false)
	private String city;

	/** User note. */
	@Column(name = "note")
	private String note;
}
