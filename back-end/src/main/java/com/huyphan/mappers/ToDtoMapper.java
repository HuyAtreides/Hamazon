package com.huyphan.mappers;

public interface ToDtoMapper<TDto, TDomain> {

	/**
	 * Map from domain model to DTO.
	 * 
	 * @param data Data need to be mapped.
	 */
	TDto toDto(TDomain data);
}
