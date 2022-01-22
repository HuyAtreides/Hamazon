package com.huyphan.dtos;

import com.huyphan.models.enums.Country;
import lombok.Getter;
import lombok.Setter;

/** Shipping address DTO. */
@Getter
@Setter
public class ShippingAddressDto {

	/** User full name. */
	private String fullname;

	/** User country. */
	private Country country;

	/** User phone number. */
	private String phoneNumber;

	/** User address. */
	private String address;

	/** User city. */
	private String city;

	/** User note. */
	private String note;
}
