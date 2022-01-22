package com.huyphan.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.huyphan.dtos.OrderItemDto;
import com.huyphan.services.OrderService;

/** Handles operations related to user order. */
@RestController
@RequestMapping("/order")
public class OrderController {

	@Autowired
	private OrderService orderService;

	/**
	 * Place order.
	 * 
	 * @param orderItemsDto All order items in the order.
	 */
	@PostMapping
	public List<OrderItemDto> placeOrder(@RequestBody List<OrderItemDto> orderItemsDto) {
		return orderService.placeOrder(orderItemsDto);
	}
}
