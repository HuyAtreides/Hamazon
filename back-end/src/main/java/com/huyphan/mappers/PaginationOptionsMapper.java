package com.huyphan.mappers;

import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.huyphan.dtos.PaginationOptionsDto;
import com.huyphan.dtos.SearchCriteriaDto;
import com.huyphan.mappers.factory.FromDtoMapperFactory;
import com.huyphan.models.AppException;
import com.huyphan.models.PaginationOptions;
import com.huyphan.models.SearchCriteria;

@Component
public class PaginationOptionsMapper
		implements FromDtoMapper<PaginationOptionsDto, PaginationOptions> {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private FromDtoMapperFactory<SearchCriteriaDto, SearchCriteria> mapperFactory;

	@Override
	public PaginationOptions fromDto(PaginationOptionsDto data) {

		Converter<List<SearchCriteriaDto>, List<SearchCriteria>> converter = (context) -> {
			List<SearchCriteriaDto> source = context.getSource();
			return source.stream().map(searchCriteria -> {
				String criteriaName = searchCriteria.getName().getValue();
				FromDtoMapper<SearchCriteriaDto, SearchCriteria> mapper;
				try {
					mapper = mapperFactory.getFromDtoMapper(criteriaName);

					return mapper.fromDto(searchCriteria);
				} catch (AppException e) {
					System.out.println(e);
					return null;
				}
			}).collect(Collectors.toList());
		};

		modelMapper.typeMap(PaginationOptionsDto.class, PaginationOptions.class)
				.addMappings(mapper -> {
					mapper.using(converter).map(PaginationOptionsDto::getCriteria,
							PaginationOptions::setCriteria);
				});

		return modelMapper.map(data, PaginationOptions.class);
	}

}
