package com.huyphan.mappers.factory;

import com.huyphan.mappers.FromDtoMapper;
import com.huyphan.models.AppException;

/** Get a from-DTO mapper corresponds to an search criteria object. */
public interface FromDtoMapperFactory<TDto, TDomain> {

	/**
	 * Get a mapper using the name.
	 * 
	 * @param name Name used to find the mapper.
	 */
	FromDtoMapper<TDto, TDomain> getFromDtoMapper(String name) throws AppException;
}
