package com.huyphan.models;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderPaginationOptions extends PaginationOptions {
	/** Search criteria list. */
	private List<SearchCriteria> criteria;
}
