package com.huyphan.dtos;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderPaginationOptionsDto extends PaginationOptionsDto {
	/** Search criteria list. */
	private List<SearchCriteriaDto> criteria;
}
