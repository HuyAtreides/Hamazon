package com.huyphan.models;

import java.util.List;
import com.huyphan.models.enums.BookOrderField;
import com.huyphan.models.enums.OrderDirection;

/** Book pagination options. */
public class BookPaginationOptions extends PaginationOptions {
	/** Order direction. */
	private OrderDirection orderDirection;

	/** Order field. */
	private BookOrderField orderField;

	/** Search criteria list. */
	private List<SearchCriteria> criteria;

	public List<SearchCriteria> getCriteria() {
		return criteria;
	}

	public void setCriteria(List<SearchCriteria> criteria) {
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
