package com.huyphan.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.huyphan.dtos.OrderItemDto;
import com.huyphan.dtos.OrderPaginationOptionsDto;
import com.huyphan.dtos.PageDto;
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
	@ResponseStatus(value = HttpStatus.NO_CONTENT)
	@PutMapping
	public void placeOrder(@RequestBody List<OrderItemDto> orderItemsDto) {
		orderService.placeOrder(orderItemsDto);
	}

	@PostMapping("/search")
	public PageDto<OrderItemDto> searchOrderItems(
			@RequestBody OrderPaginationOptionsDto paginationOptionsDto) {
		return orderService.getOrderItems(paginationOptionsDto);
	}
}
