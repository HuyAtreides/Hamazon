package com.huyphan.utils;

import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Component;
import com.huyphan.models.enums.OrderDirection;

/**
 * Provides helper methods for convert between order direction enum and spring data direction enum.
 */
@Component
public class DirectionConverter {

	/**
	 * Convert order direction enum to spring data direction enum.
	 * 
	 * @param orderDirection Order direction to convert.
	 */
	public Direction convertToDirection(OrderDirection orderDirection) {
		return orderDirection == OrderDirection.Asc ? Direction.ASC : Direction.DESC;
	}
}
