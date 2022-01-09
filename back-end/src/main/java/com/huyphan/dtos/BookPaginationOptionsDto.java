package com.huyphan.dtos;

import java.util.List;
import com.huyphan.models.enums.BookOrderField;
import com.huyphan.models.enums.OrderDirection;

/** Book pagination options DTO. */
public class BookPaginationOptionsDto extends PaginationOptionsDto {

	/** Order direction. */
	private OrderDirection orderDirection;

	/** Order field. */
	private BookOrderField orderField;

	/** Search criteria list. */
	private List<SearchCriteriaDto> criteria;

	public List<SearchCriteriaDto> getCriteria() {
		return criteria;
	}

	public void setCriteria(List<SearchCriteriaDto> criteria) {
		this.criteria = criteria;
	}

	public OrderDirection getOrderDirection() {
		return orderDirection;
	}

	public void setOrderDirection(OrderDirection orderDirection) {
		this.orderDirection = orderDirection;
	}

	public BookOrderField getOrderField() {
		return orderField;
	}

	public void setOrderField(BookOrderField orderField) {
		this.orderField = orderField;
	}

}
