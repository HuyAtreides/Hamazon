package com.huyphan.models;

/** Pagination options. */
public class PaginationOptions {

	/** Number of items per page. */
	private int pageSize;

	/** Page number (start from 0). */
	private int page;

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}
}
