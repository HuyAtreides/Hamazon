package com.huyphan.mappers;

import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.huyphan.dtos.BookDto;
import com.huyphan.models.Book;
import com.huyphan.models.Genre;

/** Maps book between domain model and DTO. */
@Component
public class BookMapper implements ToDtoMapper<BookDto, Book> {

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public BookDto toDto(Book data) {
		Converter<List<Genre>, List<String>> converter = (context) -> {
			List<Genre> genres = context.getSource();

			return genres.stream().map(genre -> genre.getValue()).collect(Collectors.toList());
		};

		modelMapper.typeMap(Book.class, BookDto.class).addMappings(
				mapper -> mapper.using(converter).map(Book::getGenres, BookDto::setGenres));

		return modelMapper.map(data, BookDto.class);
	}

}
