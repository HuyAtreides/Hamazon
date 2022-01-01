package com.huyphan.dtos;

import java.util.List;

/** Pagination options DTO. */
public class PaginationOptionsDto {

	/** Number of items per page. */
	private int pageSize;

	/** Page number (start from 0). */
	private int page;

	private List<SearchCriteriaDto> criteria;

	public List<SearchCriteriaDto> getCriteria() {
		return criteria;
	}

	public void setCriteria(List<SearchCriteriaDto> criteria) {
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
