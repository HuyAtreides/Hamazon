import { Injectable } from '@angular/core';

import { RegisterData } from '../../models/register-data';
import { RegisterDataDto } from '../dtos/register-data-dto';

import { IMapperToDto } from './mapper';

/** Register data mapper.  */
@Injectable({
  providedIn: 'root',
})
export class RegisterDataMapperService
  implements IMapperToDto<RegisterDataDto, RegisterData>
{
  /** @inheritdoc */
  public toDto(data: RegisterData): RegisterDataDto {
    return {
      username: data.username,
      email: data.email,
      password: data.password,
    };
  }
}
