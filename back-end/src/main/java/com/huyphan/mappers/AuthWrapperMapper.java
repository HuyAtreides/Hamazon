package com.huyphan.mappers;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.huyphan.dtos.AuthWrapperDto;
import com.huyphan.models.AuthWrapper;

@Component
public class AuthWrapperMapper {

	@Autowired
	private ModelMapper modelMapper;

	public <TDto, TDomain> AuthWrapper<TDomain> fromDto(AuthWrapperDto<TDto> data,
			FromDtoMapper<TDto, TDomain> payloadMapper) {
		Class<AuthWrapper<TDomain>> destType =
				new TypeToken<AuthWrapper<TDomain>>() {}.getRawType();

		Converter<TDto, TDomain> converter = (context) -> {
			TDto dataDto = context.getSource();
			return payloadMapper.fromDto(dataDto);
		};

		modelMapper.typeMap(data.getClass(), destType).addMappings(mapper -> mapper.using(converter)
				.map(AuthWrapperDto<TDto>::getPayload, AuthWrapper<TDomain>::setPayload));

		return modelMapper.map(data, destType);
	}
}
