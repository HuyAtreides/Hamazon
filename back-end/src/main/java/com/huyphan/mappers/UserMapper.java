package com.huyphan.mappers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.huyphan.dtos.UserDto;
import com.huyphan.models.User;

/** User mapper. */
@Component
public class UserMapper implements ToDtoMapper<UserDto, User> {

	@Autowired
	private ModelMapper modelMapper;

	/** {@inheritDoc} */
	@Override
	public UserDto toDto(User data) {
		return modelMapper.map(data, UserDto.class);
	}

}
