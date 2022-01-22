package com.huyphan.mappers;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.huyphan.dtos.BookDto;
import com.huyphan.dtos.ItemDto;
import com.huyphan.models.Book;
import com.huyphan.models.Item;

@Component
public class ItemMapper
		implements ToDtoBaseMapper<ItemDto, Item>, FromDtoBaseMapper<ItemDto, Item> {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private BookMapper bookMapper;

	@Override
	public TypeMap<ItemDto, Item> createFromDtoBaseTypeMap() {
		TypeMap<ItemDto, Item> typeMap = modelMapper.getTypeMap(ItemDto.class, Item.class);

		if (typeMap != null) {
			return typeMap;
		}

		Converter<BookDto, Book> converter = (context) -> {
			BookDto bookDto = context.getSource();
			return bookMapper.fromDto(bookDto);
		};

		return modelMapper.typeMap(ItemDto.class, Item.class).addMappings(mapper -> {
			mapper.using(converter).map(ItemDto::getBook, Item::setBook);
			mapper.map(ItemDto::getBookId, Item::setBookId);
		});

	}

	@Override
	public TypeMap<Item, ItemDto> createToDtoBaseTypeMap() {
		TypeMap<Item, ItemDto> typeMap = modelMapper.getTypeMap(Item.class, ItemDto.class);

		if (typeMap != null) {
			return typeMap;
		}

		Converter<Book, BookDto> converter = (context) -> {
			Book book = context.getSource();
			return bookMapper.toDto(book);
		};

		return modelMapper.typeMap(Item.class, ItemDto.class).addMappings(mapper -> {
			mapper.using(converter).map(Item::getBook, ItemDto::setBook);
			mapper.map(Item::getBookId, ItemDto::setBookId);
		});

	}

}
