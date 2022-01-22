package com.huyphan.mappers;

import org.modelmapper.TypeMap;

/**
 * Used to create a base type map which can be used by subclass to perform mapping from domain model
 * to DTO.
 */
public interface ToDtoBaseMapper<TDto, TDomain> {
	/** Create a type map from domain model to DTO. */
	TypeMap<TDomain, TDto> createToDtoBaseTypeMap();
}
