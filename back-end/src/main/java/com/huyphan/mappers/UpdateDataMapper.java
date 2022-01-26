package com.huyphan.mappers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.huyphan.dtos.UpdateDataDto;
import com.huyphan.models.UpdateData;

@Component
public class UpdateDataMapper implements FromDtoMapper<UpdateDataDto, UpdateData> {

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public UpdateData fromDto(UpdateDataDto data) {
		return modelMapper.map(data, UpdateData.class);
	}

}
