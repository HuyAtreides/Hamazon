package com.huyphan.dtos;

import lombok.Getter;
import lombok.Setter;

/** Order item DTO. */
@Getter
@Setter
public class OrderItemDto extends ItemDto {
	/** Date in which this order item was placed. */
	private String placedIn;

	/** Uniquely identify an order. */
	private long id;

	/** Shipping address of this order item. */
	private ShippingAddressDto shippingAddress;
}
