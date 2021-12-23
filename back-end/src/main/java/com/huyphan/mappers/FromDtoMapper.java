package com.huyphan.mappers;

public interface FromDtoMapper<TDto, TDomain> {

	/** Map from DTO to domain model. */
	TDomain fromDto(TDto data);
}
