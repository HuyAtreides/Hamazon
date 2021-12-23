import { Injectable } from '@angular/core';

import { User } from '../../models/user';
import { UserDto } from '../dtos/user-dto';

import { IMapperFromDto } from './mapper';

/** Map user from domain model to DTO. */
@Injectable({
  providedIn: 'root',
})
export class UserMapperService implements IMapperFromDto<UserDto, User> {
  /** @inheritdoc */
  public fromDto(data: UserDto): User {
    return {
      username: data.username,
      email: data.email,
    };
  }
}
