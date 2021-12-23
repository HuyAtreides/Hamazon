import { Injectable } from '@angular/core';

import { LoginData } from '../../models/login-data';
import { LoginDataDto } from '../dtos/login-data-dto';

import { IMapperToDto } from './mapper';

/** Map login data from domain model to DTO. */
@Injectable({
  providedIn: 'root',
})
export class LoginDataMapperService implements IMapperToDto<LoginDataDto, LoginData> {
  /** @inheritdoc */
  public toDto(data: LoginData): LoginDataDto {
    return {
      username: data.username,
      password: data.password,
    };
  }
}
