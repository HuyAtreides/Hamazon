/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

import { Genre } from '../../enums/genre';

import { Book } from '../../models/book';
import { toEnum } from '../../utils/value-to-enum';
import { BookDto } from '../dtos/book-dto';

import { IMapperFromDto, IMapperToDto } from './mapper';

/** Book mapper. */
@Injectable({
  providedIn: 'root',
})
export class BookMapperService
  implements IMapperFromDto<BookDto, Book>, IMapperToDto<BookDto, Book>
{
  /** @inheritdoc */
  public fromDto(data: BookDto): Book {
    return {
      title: data.title,
      price: data.price,
      publicationDate: new Date(data.published),
      publisher: data.publisher,
      id: data.id,
      genres: data.genres.map((genre) => toEnum(genre, Genre)),
      isbn: data.isbn,
      authorInfoUrl: data.authorInfoUrl,
      authorName: data.authorName,
      coverImgUrl: data.imageUrl,
      pages: data.pages,
      description: data.description,
    };
  }

  /** @inheritdoc */
  public toDto(data: Book): BookDto {
    return {
      title: data.title,
      price: data.price,
      published: data.publicationDate.toISOString().split('T')[0],
      publisher: data.publisher,
      id: data.id,
      genres: data.genres.map((genre) => toEnum(genre, Genre)),
      isbn: data.isbn,
      authorInfoUrl: data.authorInfoUrl,
      authorName: data.authorName,
      imageUrl: data.coverImgUrl,
      pages: data.pages,
      description: data.description,
    };
  }
}
