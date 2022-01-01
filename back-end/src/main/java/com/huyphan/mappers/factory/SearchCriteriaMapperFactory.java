package com.huyphan.mappers.factory;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.huyphan.dtos.SearchCriteriaDto;
import com.huyphan.mappers.FromDtoMapper;
import com.huyphan.mappers.SearchCriteriaMapper;
import com.huyphan.models.AppException;
import com.huyphan.models.SearchCriteria;

/** Resolves from-DTO mapper for search criteria DTO. */
@Component
public class SearchCriteriaMapperFactory
		implements FromDtoMapperFactory<SearchCriteriaDto, SearchCriteria> {

	@Autowired
	private List<SearchCriteriaMapper> mappers;

	/** {@inheritDoc} */
	@Override
	public FromDtoMapper<SearchCriteriaDto, SearchCriteria> getFromDtoMapper(String name)
			throws AppException {

		for (SearchCriteriaMapper mapper : mappers) {
			String mapperName = mapper.getCriteriaName().getValue();
			if (mapperName.equals(name)) {
				return mapper;
			}
		}

		throw new AppException("Mapper not found");
	}
}
