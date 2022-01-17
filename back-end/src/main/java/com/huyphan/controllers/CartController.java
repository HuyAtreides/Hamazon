package com.huyphan.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
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

	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PutMapping("/update")
	public void updateCartItem(@RequestBody CartItemDto updatedCartItemDto) throws AppException {
		cartService.updateCartItemAmount(updatedCartItemDto);
	}

	@ResponseStatus(HttpStatus.NO_CONTENT)
	@DeleteMapping("/delete")
	public void deleteCartItem() {
		cartService.delete();
	}

	@ResponseStatus(HttpStatus.NO_CONTENT)
	@DeleteMapping("/delete/{itemId}")
	public void deleteCartItem(@PathVariable int itemId) {
		cartService.delete(itemId);
	}
}
