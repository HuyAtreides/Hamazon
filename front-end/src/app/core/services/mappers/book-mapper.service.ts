import { Injectable } from '@angular/core';

import { Book } from '../../models/book';
import { BookDto } from '../dtos/book-dto';

import { IMapperFromDto } from './mapper';

/** Book mapper. */
@Injectable({
  providedIn: 'root',
})
export class BookMapperService implements IMapperFromDto<BookDto, Book> {
  /** @inheritdoc */
  public fromDto(data: BookDto): Book {
    return {
      title: data.title,
      price: data.price,
      publicationDate: new Date(data.published),
      publisher: data.publisher,
      id: data.id,
      genres: data.genres,
      isbn: data.isbn,
      authorInfoUrl: data.authorInfoUrl,
      authorName: data.authorName,
      coverImgUrl: data.imageUrl,
      pages: data.pages,
      description: data.description,
    };
  }
}
