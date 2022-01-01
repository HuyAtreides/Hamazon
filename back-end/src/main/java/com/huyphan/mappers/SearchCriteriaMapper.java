package com.huyphan.mappers;

import com.huyphan.dtos.SearchCriteriaDto;
import com.huyphan.models.SearchCriteria;
import com.huyphan.utils.SearchCriteriaNameGetter;

/** Maps from search criteria DTO to domain model. */
public interface SearchCriteriaMapper
		extends FromDtoMapper<SearchCriteriaDto, SearchCriteria>, SearchCriteriaNameGetter {
}
