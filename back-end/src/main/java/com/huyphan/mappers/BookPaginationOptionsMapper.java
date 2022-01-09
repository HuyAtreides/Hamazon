package com.huyphan.mappers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.huyphan.dtos.BookPaginationOptionsDto;
import com.huyphan.models.BookPaginationOptions;

/** Maps book pagination options between domain model and DTO. */
@Component
public class BookPaginationOptionsMapper
		implements FromDtoMapper<BookPaginationOptionsDto, BookPaginationOptions> {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private SearchCriteriaListConverter converter;

	@Override
	public BookPaginationOptions fromDto(BookPaginationOptionsDto data) {
		modelMapper.typeMap(BookPaginationOptionsDto.class, BookPaginationOptions.class)
				.addMappings(mapper -> mapper.using(converter).map(
						BookPaginationOptionsDto::getCriteria, BookPaginationOptions::setCriteria));


		return modelMapper.map(data, BookPaginationOptions.class);
	}

}
