package com.huyphan.utils;

import com.huyphan.models.enums.SearchCriteriaName;

/**
 * Interface implemented by mappers to provide search criteria name that this mappers belongs to.
 */
public interface SearchCriteriaNameGetter {

	/** Get search criteria name that this mapper corresponds to. */
	SearchCriteriaName getCriteriaName();
}
