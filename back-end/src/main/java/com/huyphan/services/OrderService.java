package com.huyphan.services;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.huyphan.dtos.OrderItemDto;
import com.huyphan.mappers.OrderItemMapper;
import com.huyphan.models.OrderItem;
import com.huyphan.repositories.OrderRepo;

/** Performs operations related to order. */
@Service
public class OrderService {

	@Autowired
	private AuthService authService;

	@Autowired
	private OrderRepo orderRepo;

	@Autowired
	private OrderItemMapper orderItemMapper;

	@Autowired
	private CartService cartService;

	/**
	 * Place order.
	 * 
	 * @param orderItemsDto All order items in the order.
	 */
	@Transactional
	public List<OrderItemDto> placeOrder(List<OrderItemDto> orderItemsDto) {
		String username = authService.getCurrentAuthenticatedUser().getUsername();


		for (OrderItemDto orderItemDto : orderItemsDto) {
			OrderItem orderItem = orderItemMapper.fromDto(orderItemDto);
			orderItem.setUsername(username);
			cartService.delete(orderItem.getBookId());
			orderRepo.save(orderItem);
		}

		return getOrderItems();
	}

	/** Get all order items of the current user. */
	public List<OrderItemDto> getOrderItems() {
		String username = authService.getCurrentAuthenticatedUser().getUsername();
		List<OrderItem> orderItems = orderRepo.findAllByUsername(username);
		return orderItems.stream().map(orderItem -> orderItemMapper.toDto(orderItem))
				.collect(Collectors.toList());
	}
}
