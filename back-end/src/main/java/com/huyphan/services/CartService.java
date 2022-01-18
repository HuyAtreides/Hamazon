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
		String username = getCurrentUsername();
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
	private List<CartItemDto> addExistingCartItem(CartItemKey id, int addedAmount)
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
	public void updateCartItemAmount(CartItemDto updatedCartItemDto) throws AppException {
		CartItem updatedCartItem = cartItemMapper.fromDto(updatedCartItemDto);
		String username = getCurrentUsername();
		int bookId = updatedCartItem.getBookId();
		CartItemKey cartItemKey = new CartItemKey(bookId, username);
		Optional<CartItem> optionalCartItem = cartRepo.findById(cartItemKey);
		CartItem cartItem =
				optionalCartItem.orElseThrow(() -> new AppException("Cart item not found."));

		cartItem.setAmount(updatedCartItem.getAmount());
	}

	/** Get all cart items of the current user. */
	@Transactional(readOnly = true)
	public List<CartItemDto> getCart() {
		String username = getCurrentUsername();

		List<CartItem> cartItems = cartRepo.findAllByUsername(username);
		return cartItems.stream().map(item -> cartItemMapper.toDto(item))
				.collect(Collectors.toList());
	}

	/** Delete all cart items of the current user. */
	@Transactional
	public void delete() {
		String username = getCurrentUsername();
		cartRepo.deleteAllByUsername(username);
	}

	/**
	 * Delete a specific cart item.
	 * 
	 * @param itemId Id of the item to delete.
	 */
	@Transactional
	public void delete(int itemId) {
		String username = getCurrentUsername();
		CartItemKey cartItemKey = new CartItemKey(itemId, username);
		cartRepo.deleteById(cartItemKey);
	}

	/** Get username of the current authenticated user. */
	private String getCurrentUsername() {
		User user = authService.getCurrentAuthenticatedUser();
		return user.getUsername();
	}
}
