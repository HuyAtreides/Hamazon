import { Injectable } from '@angular/core';

import { BookPaginationOptions } from '../../models/book-pagination-options';
import { BookPaginationOptionsDto } from '../dtos/book-pagination-options-dto';

import { BookSearchCriteriaMapperService } from './book-search-criteria-mapper.service';

import { IMapperToDto } from './mapper';
import { PaginationOptionsMapperService } from './pagination-options-mapper.service';

/** Book pagination options mapper. */
@Injectable({
  providedIn: 'root',
})
export class BookPaginationOptionsMapperService
  implements IMapperToDto<BookPaginationOptionsDto, BookPaginationOptions>
{
  public constructor(
    private readonly paginationOptionsMapper: PaginationOptionsMapperService,
    private readonly bookSearchCriteriaMapper: BookSearchCriteriaMapperService,
  ) {}

  /** @inheritdoc */
  public toDto(data: BookPaginationOptions): BookPaginationOptionsDto {
    return {
      ...this.paginationOptionsMapper.toDto(data),
      criteria: this.bookSearchCriteriaMapper.toDto(data.searchCriteria),
      orderDirection: data.orderDirection,
      orderField: data.orderField,
    };
  }
}
