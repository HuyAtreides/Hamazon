package com.huyphan.mappers;

public interface ToDtoMapper<TDto, TDomain> {

	/** Map from domain model to DTO. */
	TDto toDto(TDomain data);
}
