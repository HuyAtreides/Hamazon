import { Injectable } from '@angular/core';

import { Country } from '../../enums/country';
import { ShippingAddress } from '../../models/shipping-address';
import { toEnum } from '../../utils/value-to-enum';
import { ShippingAddressDto } from '../dtos/shipping-address-dto';

import { IMapperFromDto, IMapperToDto } from './mapper';

/** Shipping address mapper. */
@Injectable({
  providedIn: 'root',
})
export class ShippingAddressMapperService
  implements
    IMapperFromDto<ShippingAddressDto, ShippingAddress>,
    IMapperToDto<ShippingAddressDto, ShippingAddress>
{
  /** @inheritdoc */
  public fromDto(data: ShippingAddressDto): ShippingAddress {
    return {
      fullname: data.fullname,
      address: data.address,
      note: data.note,
      phoneNumber: data.phoneNumber,
      city: data.city,
      country: toEnum(data.country, Country),
    };
  }

  /** @inheritdoc */
  public toDto(data: ShippingAddress): ShippingAddressDto {
    return {
      fullname: data.fullname,
      address: data.address,
      note: data.note,
      phoneNumber: data.phoneNumber,
      city: data.city,
      country: data.country,
    };
  }
}
