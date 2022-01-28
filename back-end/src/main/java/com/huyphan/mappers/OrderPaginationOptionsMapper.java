package com.huyphan.mappers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.huyphan.dtos.OrderPaginationOptionsDto;
import com.huyphan.models.OrderPaginationOptions;

@Component
public class OrderPaginationOptionsMapper
		implements FromDtoMapper<OrderPaginationOptionsDto, OrderPaginationOptions> {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private SearchCriteriaListConverter converter;

	@Override
	public OrderPaginationOptions fromDto(OrderPaginationOptionsDto data) {
		modelMapper.typeMap(OrderPaginationOptionsDto.class, OrderPaginationOptions.class)
				.addMappings(mapper -> mapper.using(converter).map(
						OrderPaginationOptionsDto::getCriteria,
						OrderPaginationOptions::setCriteria));


		return modelMapper.map(data, OrderPaginationOptions.class);
	}

}
