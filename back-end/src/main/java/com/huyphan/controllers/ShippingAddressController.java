package com.huyphan.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.huyphan.dtos.ShippingAddressDto;
import com.huyphan.services.ShippingAddressService;

/** Handles operations related to shipping address. */
@RestController
@RequestMapping("/shipping-address")
public class ShippingAddressController {

	@Autowired
	private ShippingAddressService shippingAddressService;

	/**
	 * Save shipping address. Update if there is existing shipping address associates with the
	 * current user, otherwise create new one.
	 * 
	 * @param shippingAddressDto Shipping address to save.
	 */
	@ResponseStatus(value = HttpStatus.NO_CONTENT)
	@PutMapping
	public void saveShippingAddress(@RequestBody ShippingAddressDto shippingAddressDto) {
		this.shippingAddressService.saveShippingAddress(shippingAddressDto);
	}

	/**
	 * Get shipping address of the current user.
	 */
	@GetMapping
	public ShippingAddressDto getShippingAddress() {
		return shippingAddressService.getShippingAddress();
	}
}
