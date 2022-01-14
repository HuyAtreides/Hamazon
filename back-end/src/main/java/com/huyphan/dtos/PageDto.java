package com.huyphan.dtos;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

/** Page DTO. */
@Getter
@Setter
public class PageDto<T> {

	/** Page number (0-based). */
	private int number;

	/** Total amount of elements. */
	private long totalElements;

	/** Whether this page is the last one. */
	private boolean last;

	/** Whether this page is the first one. */
	private boolean first;

	/** Number of elements in this page. */
	private int numberOfElements;

	/** Total pages. */
	private int totalPages;

	/** Page content. */
	private List<T> content;
}
