package com.huyphan.mappers;

import java.time.LocalDate;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.huyphan.dtos.BookDto;
import com.huyphan.dtos.OrderItemDto;
import com.huyphan.models.Book;
import com.huyphan.models.OrderItem;

/** Order item mapper. */
@Component
public class OrderItemMapper
		implements FromDtoMapper<OrderItemDto, OrderItem>, ToDtoMapper<OrderItemDto, OrderItem> {

	@Autowired
	private ItemMapper itemMapper;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private BookMapper bookMapper;

	@Override
	public OrderItemDto toDto(OrderItem data) {
		modelMapper.getConfiguration().setAmbiguityIgnored(true);
		itemMapper.createToDtoBaseTypeMap();

		Converter<LocalDate, String> converter = (context) -> {
			LocalDate date = context.getSource();
			return date.toString();
		};

		Converter<Book, BookDto> converter1 = (context) -> {
			Book book = context.getSource();
			return bookMapper.toDto(book);
		};


		modelMapper.typeMap(OrderItem.class, OrderItemDto.class).addMappings(mapper -> {
			mapper.using(converter1).map(OrderItem::getBook, OrderItemDto::setBook);
			mapper.map(OrderItem::getBookId, OrderItemDto::setBookId);
			mapper.using(converter).map(OrderItem::getPlacedIn, OrderItemDto::setPlacedIn);
		});

		return modelMapper.map(data, OrderItemDto.class);
	}

	@Override
	public OrderItem fromDto(OrderItemDto data) {
		modelMapper.getConfiguration().setAmbiguityIgnored(true);
		itemMapper.createFromDtoBaseTypeMap();

		Converter<BookDto, Book> converter1 = (context) -> {
			BookDto bookDto = context.getSource();
			return bookMapper.fromDto(bookDto);
		};

		Converter<String, LocalDate> converter = (context) -> {
			String date = context.getSource();
			return LocalDate.parse(date);
		};

		modelMapper.typeMap(OrderItemDto.class, OrderItem.class).addMappings(mapper -> {
			mapper.using(converter1).map(OrderItemDto::getBook, OrderItem::setBook);
			mapper.map(OrderItemDto::getBookId, OrderItem::setBookId);
			mapper.using(converter).map(OrderItemDto::getPlacedIn, OrderItem::setPlacedIn);
		});

		return modelMapper.map(data, OrderItem.class);
	}
}
