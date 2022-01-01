package com.huyphan.mappers;

import com.huyphan.models.AppException;

public interface FromDtoMapper<TDto, TDomain> {

	/**
	 * Map from DTO to domain model.
	 * 
	 * @param data Data need to be mapped.
	 * @throws AppException
	 */
	TDomain fromDto(TDto data);
}
