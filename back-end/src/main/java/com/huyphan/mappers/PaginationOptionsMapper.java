package com.huyphan.mappers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.huyphan.dtos.PaginationOptionsDto;
import com.huyphan.models.PaginationOptions;

/** Maps pagination options between domain model and DTO. */
@Component
public class PaginationOptionsMapper
		implements FromDtoMapper<PaginationOptionsDto, PaginationOptions> {

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public PaginationOptions fromDto(PaginationOptionsDto data) {
		return modelMapper.map(data, PaginationOptions.class);
	}
}
