import { Injectable } from '@angular/core';

import { AuthWrapper } from '../../models/auth-wrapper';
import { AuthWrapperDto } from '../dtos/auth-wrapper-dto';

import { IMapperToDto } from './mapper';

/** Auth wrapper mapper. */
@Injectable({
  providedIn: 'root',
})
export class AuthWrapperMapperService {
  /**
   * Map auth wrapper to dto.
   * @param data Domain auth wrapper.
   * @param mapper Mapper for the payload.
   */
  public toDto<TDomain, TDto>(
    data: AuthWrapper<TDomain>,
    mapper: IMapperToDto<TDto, TDomain>,
  ): AuthWrapperDto<TDto> {
    return {
      credential: data.credential,
      payload: mapper.toDto(data.payload),
    };
  }
}
