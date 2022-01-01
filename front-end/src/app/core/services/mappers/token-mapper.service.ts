import { Injectable } from '@angular/core';

import { Token } from '../../models/token';
import { TokenDto } from '../dtos/token-dto';

import { IMapperFromDto, IMapperToDto } from './mapper';

/** Token mapper. */
@Injectable({
  providedIn: 'root',
})
export class TokenMapperService
  implements IMapperFromDto<TokenDto, Token>, IMapperToDto<TokenDto, Token>
{
  /** @inheritdoc */
  public fromDto(data: TokenDto): Token {
    return {
      value: data.value,
    };
  }

  /** @inheritdoc */
  public toDto(data: Token): TokenDto {
    return {
      value: data.value,
    };
  }
}
