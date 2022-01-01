package com.huyphan.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.huyphan.dtos.PaginationOptionsDto;
import com.huyphan.mappers.PaginationOptionsMapper;
import com.huyphan.models.PaginationOptions;
import com.huyphan.models.SearchCriteria;

/** Handle operations related to books. */
@RestController
@RequestMapping("/books")
public class BooksController {

	@Autowired
	private PaginationOptionsMapper mapper;

	@PostMapping
	public String searchBooks(@RequestBody PaginationOptionsDto paginationOptionsDto) {
		PaginationOptions p = mapper.fromDto(paginationOptionsDto);
		for (SearchCriteria s : p.getCriteria()) {

			System.out.println(s.getValue());
		}
		return "";
	}
}
