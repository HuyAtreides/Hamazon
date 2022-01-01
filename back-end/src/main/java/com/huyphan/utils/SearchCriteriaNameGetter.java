package com.huyphan.utils;

import com.huyphan.models.enums.SearchCriteriaName;

/**
 * Interface implemented by mappers or predicate constructors to provide search criteria name that
 * this mappers or predicate constructor belongs to.
 */
public interface SearchCriteriaNameGetter {

	/** Get search criteria name that this mapper or predicate constructor corresponds to. */
	SearchCriteriaName getCriteriaName();
}
