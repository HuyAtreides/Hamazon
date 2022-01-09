import { Injectable } from '@angular/core';

import { Page } from '../../models/page';
import { PageDto } from '../dtos/page-dto';

import { IMapperFromDto } from './mapper';

/** Page mapper. */
@Injectable({
  providedIn: 'root',
})
export class PageMapperService {
  /**
   * Map pagination from dto.
   * @param pageDto Dto page.
   * @param mapper Mapper for the content.
   */
  public mapPaginationFromDto<TDto, TDomain>(
    pageDto: PageDto<TDto>,
    mapper: IMapperFromDto<TDto, TDomain>,
  ): Page<TDomain> {
    return {
      content: pageDto.content.map((element) => mapper.fromDto(element)),
      number: pageDto.number,
      size: pageDto.numberOfElements,
      total: pageDto.totalElements,
      totalPages: pageDto.totalPages,
      isFirst: pageDto.first,
      isLast: pageDto.last,
    };
  }
}
