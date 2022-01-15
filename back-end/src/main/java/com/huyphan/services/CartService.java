package com.huyphan.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.huyphan.dtos.CartItemDto;
import com.huyphan.mappers.CartItemMapper;
import com.huyphan.models.AppException;
import com.huyphan.models.CartItem;
import com.huyphan.models.CartItemKey;
import com.huyphan.models.User;
import com.huyphan.repositories.CartRepo;

/** Performs operations related to cart. */
@Service
public class CartService {

	@Autowired
	private CartRepo cartRepo;

	@Autowired
	private AuthService authService;

	@Autowired
	private CartItemMapper cartItemMapper;

	/**
	 * Add new cart item.
	 * 
	 * @param cartItemDto New cart item to add.
	 * @throws AppException
	 */
	@Transactional
	public List<CartItemDto> addNewCartItem(CartItemDto cartItemDto) throws AppException {
		User user = authService.getCurrentAuthenticatedUser();
		String username = user.getUsername();
		CartItem cartItem = cartItemMapper.fromDto(cartItemDto);
		int bookId = cartItem.getBookId();
		CartItemKey cartItemKey = new CartItemKey(bookId, username);
		cartItem.setUsername(username);

		if (cartRepo.existsById(cartItemKey)) {
			return addExistingCartItem(cartItemKey, cartItem.getAmount());
		}

		cartRepo.save(cartItem);
		return getCart();
	}

	@Transactional
	public List<CartItemDto> addExistingCartItem(CartItemKey id, int addedAmount)
			throws AppException {
		Optional<CartItem> optionalCartItem = cartRepo.findById(id);
		CartItem cartItem =
				optionalCartItem.orElseThrow(() -> new AppException("Cart item not found."));

		int currentAmount = cartItem.getAmount();
		cartItem.setAmount(currentAmount + addedAmount);
		return getCart();
	}

	/**
	 * Update cart item amount.
	 * 
	 * @param updatedCartItem A cart item which has a new amount.
	 */
	@Transactional
	public List<CartItemDto> updateCartItemAmount(CartItemDto updatedCartItemDto)
			throws AppException {
		CartItem updatedCartItem = cartItemMapper.fromDto(updatedCartItemDto);
		User user = authService.getCurrentAuthenticatedUser();
		String username = user.getUsername();
		int bookId = updatedCartItem.getBookId();
		CartItemKey cartItemKey = new CartItemKey(bookId, username);
		Optional<CartItem> optionalCartItem = cartRepo.findById(cartItemKey);
		CartItem cartItem =
				optionalCartItem.orElseThrow(() -> new AppException("Cart item not found."));

		cartItem.setAmount(updatedCartItem.getAmount());
		return getCart();
	}

	/** Get all cart items of the current user. */
	@Transactional(readOnly = true)
	public List<CartItemDto> getCart() {
		User user = authService.getCurrentAuthenticatedUser();
		String username = user.getUsername();

		List<CartItem> cartItems = cartRepo.findAllByUsername(username);
		return cartItems.stream().map(item -> cartItemMapper.toDto(item))
				.collect(Collectors.toList());
	}
}
