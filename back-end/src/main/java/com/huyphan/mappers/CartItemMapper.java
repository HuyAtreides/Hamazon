package com.huyphan.mappers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.huyphan.dtos.CartItemDto;
import com.huyphan.dtos.ItemDto;
import com.huyphan.models.CartItem;
import com.huyphan.models.Item;


@Component
public class CartItemMapper
		implements FromDtoMapper<CartItemDto, CartItem>, ToDtoMapper<CartItemDto, CartItem> {
	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private ItemMapper itemMapper;

	@Override
	public CartItem fromDto(CartItemDto data) {
		modelMapper.getConfiguration().setAmbiguityIgnored(true);
		itemMapper.createFromDtoBaseTypeMap();

		modelMapper.typeMap(CartItemDto.class, CartItem.class).includeBase(ItemDto.class,
				Item.class);

		return modelMapper.map(data, CartItem.class);
	}

	@Override
	public CartItemDto toDto(CartItem data) {
		modelMapper.getConfiguration().setAmbiguityIgnored(true);

		itemMapper.createToDtoBaseTypeMap();

		modelMapper.typeMap(CartItem.class, CartItemDto.class).includeBase(Item.class,
				ItemDto.class);

		return modelMapper.map(data, CartItemDto.class);
	}

}
