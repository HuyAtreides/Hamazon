package com.huyphan.dtos;

import java.util.List;

/** Page DTO. */
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

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

	public long getTotalElements() {
		return totalElements;
	}

	public void setTotalElements(long totalElements) {
		this.totalElements = totalElements;
	}

	public boolean isLast() {
		return last;
	}

	public void setLast(boolean last) {
		this.last = last;
	}

	public int getNumberOfElements() {
		return numberOfElements;
	}

	public void setNumberOfElements(int numberOfElements) {
		this.numberOfElements = numberOfElements;
	}

	public int getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

	public List<T> getContent() {
		return content;
	}

	public void setContent(List<T> content) {
		this.content = content;
	}

	public boolean isFirst() {
		return first;
	}

	public void setFirst(boolean first) {
		this.first = first;
	}
}
