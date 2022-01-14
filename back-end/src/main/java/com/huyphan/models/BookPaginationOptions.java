package com.huyphan.models;

import java.util.List;
import com.huyphan.models.enums.BookOrderField;
import com.huyphan.models.enums.OrderDirection;
import lombok.Getter;
import lombok.Setter;

/** Book pagination options. */
@Getter
@Setter
public class BookPaginationOptions extends PaginationOptions {
	/** Order direction. */
	private OrderDirection orderDirection;

	/** Order field. */
	private BookOrderField orderField;

	/** Search criteria list. */
	private List<SearchCriteria> criteria;
}
