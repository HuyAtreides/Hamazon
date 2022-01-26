import { Injectable } from '@angular/core';

import { RegisterDataDto } from '../dtos/register-data-dto';
import { UpdateDataDto } from '../dtos/update-data-dto';

import { IMapperToDto } from './mapper';
import { RegisterDataMapperService } from './register-data-mapper.service';

/** Update data mapper. */
@Injectable({
  providedIn: 'root',
})
export class UpdateDataMapperService
  implements IMapperToDto<UpdateDataDto, UpdateDataDto>
{
  public constructor(private readonly registerDataMapper: RegisterDataMapperService) {}

  /** @inheritdoc */
  public toDto(data: RegisterDataDto): RegisterDataDto {
    return this.registerDataMapper.toDto(data);
  }
}
