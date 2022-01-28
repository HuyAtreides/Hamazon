import { Injectable } from '@angular/core';

import { OrderPaginationOptions } from '../../models/order-pagination-options';
import { OrderPaginationOptionsDto } from '../dtos/order-pagination-options-dto';

import { IMapperToDto } from './mapper';
import { OrderSearchCriteriaMapperService } from './order-search-criteria-mapper.service';
import { PaginationOptionsMapperService } from './pagination-options-mapper.service';

/** Order pagination options mapper. */
@Injectable({
  providedIn: 'root',
})
export class OrderPaginationOptionsMapperService
  implements IMapperToDto<OrderPaginationOptionsDto, OrderPaginationOptions>
{
  public constructor(
    private readonly orderSearchCriteriaMapper: OrderSearchCriteriaMapperService,
    private readonly paginationOptionsMapper: PaginationOptionsMapperService,
  ) {}

  /** @inheritdoc */
  public toDto(data: OrderPaginationOptions): OrderPaginationOptionsDto {
    return {
      ...this.paginationOptionsMapper.toDto(data),
      criteria: this.orderSearchCriteriaMapper.toDto(data.searchCriteria),
    };
  }
}
