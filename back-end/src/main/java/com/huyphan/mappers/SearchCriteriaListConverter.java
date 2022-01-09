package com.huyphan.mappers;

import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.huyphan.dtos.SearchCriteriaDto;
import com.huyphan.mappers.factory.FromDtoMapperFactory;
import com.huyphan.models.AppException;
import com.huyphan.models.SearchCriteria;

/** Converter for model mapper. */
@Component
public class SearchCriteriaListConverter
		implements Converter<List<SearchCriteriaDto>, List<SearchCriteria>> {

	@Autowired
	private FromDtoMapperFactory<SearchCriteriaDto, SearchCriteria> mapperFactory;

	/** {@inheritDoc} */
	@Override
	public List<SearchCriteria> convert(
			MappingContext<List<SearchCriteriaDto>, List<SearchCriteria>> context) {

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
	}

}
