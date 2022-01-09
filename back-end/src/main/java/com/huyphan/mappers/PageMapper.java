package com.huyphan.mappers;

import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import com.huyphan.dtos.PageDto;

/** Maps page between domain model and DTO. */
@Component
public class PageMapper<TDto, TDomain> {
	@Autowired
	private ModelMapper modelMapper;

	/**
	 * Maps page from domain model to DTO.
	 * 
	 * @param data Date needed to be mapped.
	 * @param contentMapper Mapper used for this page content.
	 */
	public PageDto<TDto> toDto(Page<TDomain> data, ToDtoMapper<TDto, TDomain> contentMapper) {
		Class<PageDto<TDto>> destType = new TypeToken<PageDto<TDto>>() {}.getRawType();
		Converter<List<TDomain>, List<TDto>> converter = (context) -> {
			List<TDomain> content = context.getSource();
			return content.stream().map(element -> {
				return contentMapper.toDto(element);
			}).collect(Collectors.toList());
		};

		modelMapper.typeMap(data.getClass(), destType).addMappings(mapper -> mapper.using(converter)
				.map(Page<TDomain>::getContent, PageDto<TDto>::setContent));

		return modelMapper.map(data, destType);
	}

}
