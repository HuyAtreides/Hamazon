package com.huyphan.mappers;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.huyphan.dtos.ShippingAddressDto;
import com.huyphan.models.AppException;
import com.huyphan.models.ShippingAddress;
import com.huyphan.models.enums.Country;

/** Shipping address mapper. */
@Component
public class ShippingAddressMapper implements ToDtoMapper<ShippingAddressDto, ShippingAddress>,
		FromDtoMapper<ShippingAddressDto, ShippingAddress> {

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public ShippingAddressDto toDto(ShippingAddress data) {
		Converter<String, Country> converter = (context) -> {
			String country = context.getSource();
			try {
				return Country.toCountry(country);
			} catch (AppException e) {
				e.printStackTrace();
				return null;
			}
		};

		modelMapper.typeMap(ShippingAddress.class, ShippingAddressDto.class)
				.addMappings(mapper -> mapper.using(converter).map(ShippingAddress::getCountry,
						ShippingAddressDto::setCountry));

		return modelMapper.map(data, ShippingAddressDto.class);
	}

	@Override
	public ShippingAddress fromDto(ShippingAddressDto data) {
		Converter<Country, String> converter = (context) -> {
			Country country = context.getSource();
			return country.getValue();
		};

		modelMapper.typeMap(ShippingAddressDto.class, ShippingAddress.class)
				.addMappings(mapper -> mapper.using(converter).map(ShippingAddressDto::getCountry,
						ShippingAddress::setCountry));

		return modelMapper.map(data, ShippingAddress.class);
	}

}
