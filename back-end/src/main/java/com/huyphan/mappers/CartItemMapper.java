package com.huyphan.mappers;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.huyphan.dtos.BookDto;
import com.huyphan.dtos.CartItemDto;
import com.huyphan.models.Book;
import com.huyphan.models.CartItem;


@Component
public class CartItemMapper
		implements FromDtoMapper<CartItemDto, CartItem>, ToDtoMapper<CartItemDto, CartItem> {
	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private BookMapper bookMapper;

	@Override
	public CartItem fromDto(CartItemDto data) {
		Converter<BookDto, Book> converter = (context) -> {
			BookDto bookDto = context.getSource();
			return bookMapper.fromDto(bookDto);
		};

		modelMapper.getConfiguration().setAmbiguityIgnored(true);

		modelMapper.typeMap(CartItemDto.class, CartItem.class).addMappings(mapper -> {
			mapper.using(converter).map(CartItemDto::getBook, CartItem::setBook);
			mapper.map(CartItemDto::getBookId, CartItem::setBookId);
		});

		CartItem item = modelMapper.map(data, CartItem.class);
		return item;

	}

	@Override
	public CartItemDto toDto(CartItem data) {
		Converter<Book, BookDto> converter = (context) -> {
			Book book = context.getSource();
			return bookMapper.toDto(book);
		};

		modelMapper.getConfiguration().setAmbiguityIgnored(true);

		modelMapper.typeMap(CartItem.class, CartItemDto.class).addMappings(mapper -> {
			mapper.using(converter).map(CartItem::getBook, CartItemDto::setBook);
			mapper.map(CartItem::getBookId, CartItemDto::setBookId);
		});

		return modelMapper.map(data, CartItemDto.class);
	}
}
