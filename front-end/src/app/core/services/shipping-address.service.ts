import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ShippingAddress } from '../models/shipping-address';

import { AppConfigService } from './app-config.service';
import { ShippingAddressDto } from './dtos/shipping-address-dto';
import { ShippingAddressMapperService } from './mappers/shipping-address-mapper.service';

/** Service handles operations related to order. */
@Injectable({
  providedIn: 'root',
})
export class ShippingAddressService {
  /** Shipping address url endpoint. */
  public readonly shippingAddressUrl: URL;

  public constructor(
    private readonly appConfig: AppConfigService,
    private readonly shippingAddressMapper: ShippingAddressMapperService,
    private readonly http: HttpClient,
  ) {
    this.shippingAddressUrl = new URL('shipping-address', this.appConfig.apiUrl);
  }

  /** Save shipping address.
   * @param shippingAddress The shipping address to save.*/
  public saveShippingAddress(shippingAddress: ShippingAddress): Observable<void> {
    const shippingAddressDto = this.shippingAddressMapper.toDto(shippingAddress);

    return this.http.put<void>(this.shippingAddressUrl.toString(), shippingAddressDto);
  }

  /** Get shipping address of the current user. */
  public getShippingAddress(): Observable<ShippingAddress | null> {
    return this.http
      .get<ShippingAddressDto | null>(this.shippingAddressUrl.toString())
      .pipe(
        map((response) =>
          response ? this.shippingAddressMapper.fromDto(response) : response,
        ),
      );
  }
}
