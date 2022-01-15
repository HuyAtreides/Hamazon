package com.huyphan.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.huyphan.dtos.CartItemDto;
import com.huyphan.models.AppException;
import com.huyphan.services.CartService;

/** Handles operations related to cart. */
@RestController
@RequestMapping("/cart")
public class CartController {

	@Autowired
	private CartService cartService;

	/**
	 * Add new cart item.
	 * 
	 * @param cartItemDto New cart item.
	 * @throws AppException
	 */
	@PostMapping("/add")
	public List<CartItemDto> addNewCartItem(@RequestBody CartItemDto cartItemDto)
			throws AppException {
		return cartService.addNewCartItem(cartItemDto);
	}

	/** Get current user's cart. */
	@GetMapping
	public List<CartItemDto> getCart() {
		return cartService.getCart();
	}
}
