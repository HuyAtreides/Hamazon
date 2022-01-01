package com.huyphan.mappers;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.huyphan.dtos.SearchCriteriaDto;
import com.huyphan.models.AppException;
import com.huyphan.models.SearchCriteria;
import com.huyphan.models.enums.BookGenre;
import com.huyphan.models.enums.SearchCriteriaName;

/** Search books by genre criteria mapper. */
@Component
public class SearchByGenreMapper implements SearchCriteriaMapper {

	@Autowired
	private ModelMapper modelMapper;

	/** {@inheritDoc} */
	@Override
	public SearchCriteria fromDto(SearchCriteriaDto data) {
		Converter<String, BookGenre> converter = (context) -> {
			try {
				String genre = context.getSource();
				return BookGenre.toGenre(genre);
			} catch (AppException exception) {
				System.out.println(exception);
				return null;
			}
		};

		modelMapper.typeMap(SearchCriteriaDto.class, SearchCriteria.class)
				.addMappings(mapper -> mapper.using(converter).map(SearchCriteriaDto::getValue,
						SearchCriteria::setValue));

		return modelMapper.map(data, SearchCriteria.class);
	}

	@Override
	public SearchCriteriaName getCriteriaName() {
		return SearchCriteriaName.Genre;
	}

}
