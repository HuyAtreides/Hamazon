package com.huyphan.mappers;

import org.modelmapper.TypeMap;

/**
 * Used to create a base type map which can be used by subclass to perform mapping from DTO to
 * domain model.
 */
public interface FromDtoBaseMapper<TDto, TDomain> {
	/** Create a type map from DTO to domain model. */
	TypeMap<TDto, TDomain> createFromDtoBaseTypeMap();
}
