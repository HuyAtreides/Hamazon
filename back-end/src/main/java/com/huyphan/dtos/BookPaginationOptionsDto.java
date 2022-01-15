package com.huyphan.dtos;

import java.util.List;
import com.huyphan.models.enums.BookOrderField;
import com.huyphan.models.enums.OrderDirection;
import lombok.Getter;
import lombok.Setter;

/** Book pagination options DTO. */
@Getter
@Setter
public class BookPaginationOptionsDto extends PaginationOptionsDto {

	/** Order direction. */
	private OrderDirection orderDirection;

	/** Order field. */
	private BookOrderField orderField;

	/** Search criteria list. */
	private List<SearchCriteriaDto> criteria;
}
