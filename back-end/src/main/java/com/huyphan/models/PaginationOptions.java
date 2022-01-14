package com.huyphan.models;

import lombok.Getter;
import lombok.Setter;

/** Pagination options. */
@Getter
@Setter
public class PaginationOptions {

	/** Number of items per page. */
	private int pageSize;

	/** Page number (start from 0). */
	private int page;
}
