package com.huyphan.mappers;

import java.time.LocalDate;
import java.util.List;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.huyphan.dtos.SearchCriteriaDto;
import com.huyphan.models.SearchCriteria;
import com.huyphan.models.enums.SearchCriteriaName;

/** Search books by published date criteria mapper. */
@Component
public class SearchByDateRangeMapper implements SearchCriteriaMapper {

	@Autowired
	private ModelMapper modelMapper;

	/** {@inheritDoc} */
	@Override
	public SearchCriteria fromDto(SearchCriteriaDto data) {
		Converter<List<String>, LocalDate[]> converter = (context) -> {
			List<String> dateRange = context.getSource();
			String startDate = dateRange.get(0);
			String endDate = dateRange.get(1);
			LocalDate[] localDates = new LocalDate[2];
			localDates[0] = LocalDate.parse(startDate);
			localDates[1] = LocalDate.parse(endDate);
			return localDates;
		};

		modelMapper.typeMap(SearchCriteriaDto.class, SearchCriteria.class)
				.addMappings(mapper -> mapper.using(converter).map(SearchCriteriaDto::getValue,
						SearchCriteria::setValue));

		return modelMapper.map(data, SearchCriteria.class);

	}

	/** {@inheritDoc} */
	@Override
	public SearchCriteriaName getCriteriaName() {
		return SearchCriteriaName.DateRange;
	}
}
