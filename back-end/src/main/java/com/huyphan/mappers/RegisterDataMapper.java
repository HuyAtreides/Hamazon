package com.huyphan.mappers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.huyphan.dtos.RegisterDataDto;
import com.huyphan.models.RegisterData;

/** Register data mapper. */
@Component
public class RegisterDataMapper implements FromDtoMapper<RegisterDataDto, RegisterData> {

	@Autowired
	private ModelMapper modelMapper;

	/** {@inheritDoc} */
	@Override
	public RegisterData fromDto(RegisterDataDto data) {
		return modelMapper.map(data, RegisterData.class);
	}

}
