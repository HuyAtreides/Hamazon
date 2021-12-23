package com.huyphan.mappers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.huyphan.dtos.LoginDataDto;
import com.huyphan.models.LoginData;

/** Login data mapper. */
@Component
public class LoginDataMapper implements FromDtoMapper<LoginDataDto, LoginData> {

	@Autowired
	private ModelMapper modelMapper;

	/** {@inheritDoc} */
	@Override
	public LoginData fromDto(LoginDataDto data) {
		return modelMapper.map(data, LoginData.class);
	}

}
