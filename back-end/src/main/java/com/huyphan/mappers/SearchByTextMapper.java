package com.huyphan.mappers;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.huyphan.dtos.SearchCriteriaDto;
import com.huyphan.models.SearchCriteria;
import com.huyphan.models.enums.SearchCriteriaName;

/** Search books by text criteria mapper. */
@Component
public class SearchByTextMapper implements SearchCriteriaMapper {

	@Autowired
	private ModelMapper modelMapper;

	/** @see FromDtoMapper#fromDto(Object) */
	@Override
	public SearchCriteria fromDto(SearchCriteriaDto data) {
		Converter<String, String> converter = (context) -> {
			return context.getSource();
		};

		modelMapper.typeMap(SearchCriteriaDto.class, SearchCriteria.class).addMappings(mapper -> {
			mapper.using(converter).map(SearchCriteriaDto::getValue, SearchCriteria::setValue);
		});

		return modelMapper.map(data, SearchCriteria.class);

	}

	/** {@inheritDoc} */
	@Override
	public SearchCriteriaName getCriteriaName() {
		return SearchCriteriaName.Text;
	}

}
