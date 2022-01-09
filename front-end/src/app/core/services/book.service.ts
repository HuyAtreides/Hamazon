import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { catchError, map } from 'rxjs/operators';

import { Book } from '../models/book';
import { BookPaginationOptions } from '../models/book-pagination-options';
import { Page } from '../models/page';

import { AutoCompleteOptions } from '../models/auto-complete-options';

import { BookPaginationOptionsMapperService } from './mappers/book-pagination-options-mapper.service';
import { AppConfigService } from './app-config.service';
import { PageDto } from './dtos/page-dto';
import { BookDto } from './dtos/book-dto';
import { PageMapperService } from './mappers/page-mapper.service';
import { BookMapperService } from './mappers/book-mapper.service';
import { AutoCompleteOptionsMapperService } from './mappers/auto-complete-options-mapper.service';

/** Book service. */
@Injectable({
  providedIn: 'root',
})
export class BookService {
  /** URL for searching books. */
  private readonly searchBooksUrl: URL;

  /** URL for suggesting books. */
  private readonly suggestBooksUrl: URL;

  public constructor(
    private readonly appConfig: AppConfigService,
    private readonly http: HttpClient,
    private readonly paginationOptionsMapper: BookPaginationOptionsMapperService,
    private readonly pageMapper: PageMapperService,
    private readonly bookMapper: BookMapperService,
    private readonly autoCompleteOptionsMapper: AutoCompleteOptionsMapperService,
  ) {
    this.searchBooksUrl = new URL('books/search', this.appConfig.apiUrl);
    this.suggestBooksUrl = new URL('books/suggest', this.appConfig.apiUrl);
  }

  /** Get a page of books.
   * @param paginationOptions Object contains pagination config options.
   */
  public getBooks(paginationOptions: BookPaginationOptions): Observable<Page<Book>> {
    const paginationOptionsDto = this.paginationOptionsMapper.toDto(paginationOptions);

    return this.http
      .post<PageDto<BookDto>>(this.searchBooksUrl.toString(), paginationOptionsDto)
      .pipe(
        map((response) =>
          this.pageMapper.mapPaginationFromDto<BookDto, Book>(response, this.bookMapper),
        ),
        catchError((error: HttpErrorResponse) => throwError(error)),
      );
  }

  /** Suggests books.
   * @param options Options used for book suggestion.
   */
  public suggestBooks(options: AutoCompleteOptions): Observable<readonly Book[]> {
    const optionsDto = this.autoCompleteOptionsMapper.toDto(options);
    const params = new HttpParams({
      fromObject: optionsDto as {},
    });

    return this.http
      .get<readonly BookDto[]>(this.suggestBooksUrl.toString(), { params })
      .pipe(
        map((booksDto) => booksDto.map((bookDto) => this.bookMapper.fromDto(bookDto))),
      );
  }
}
