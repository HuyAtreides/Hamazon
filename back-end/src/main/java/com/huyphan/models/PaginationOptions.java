package com.huyphan.models;

import java.util.List;

/** Pagination options. */
public class PaginationOptions {

	/** Number of items per page. */
	private int pageSize;

	/** Page number (start from 0). */
	private int page;

	private List<SearchCriteria> criteria;

	public List<SearchCriteria> getCriteria() {
		return criteria;
	}

	public void setCriteria(List<SearchCriteria> criteria) {
		this.criteria = criteria;
	}

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
