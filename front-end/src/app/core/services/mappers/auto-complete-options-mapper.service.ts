import { Injectable } from '@angular/core';

import { AutoCompleteOptions } from '../../models/auto-complete-options';
import { AutoCompleteOptionsDto } from '../dtos/auto-complete-options-dto';

import { IMapperToDto } from './mapper';

/** Auto complete options mapper. */
@Injectable({
  providedIn: 'root',
})
export class AutoCompleteOptionsMapperService
  implements IMapperToDto<AutoCompleteOptionsDto, AutoCompleteOptions>
{
  /** @inheritdoc */
  public toDto(data: AutoCompleteOptions): AutoCompleteOptionsDto {
    return {
      searchString: data.searchString,
    };
  }
}
