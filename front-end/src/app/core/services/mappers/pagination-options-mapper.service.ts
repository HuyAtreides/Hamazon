import { Injectable } from '@angular/core';

import { PaginationOptions } from '../../models/pagination-options';
import { PaginationOptionsDto } from '../dtos/pagination-options-dto';

import { IMapperToDto } from './mapper';

/** Pagination options mapper. */
@Injectable({
  providedIn: 'root',
})
export class PaginationOptionsMapperService
  implements IMapperToDto<PaginationOptionsDto, PaginationOptions>
{
  /** @inheritdoc */
  public toDto(data: PaginationOptions): PaginationOptionsDto {
    return {
      page: data.page,
      pageSize: data.pageSize,
    };
  }
}
