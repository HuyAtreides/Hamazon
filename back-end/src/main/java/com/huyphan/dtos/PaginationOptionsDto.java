package com.huyphan.dtos;

import lombok.Getter;
import lombok.Setter;

/** Pagination options DTO. */
@Getter
@Setter
public class PaginationOptionsDto {

	/** Number of items per page. */
	private int pageSize;

	/** Page number (start from 0). */
	private int page;
}
