import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, switchMapTo, tap } from 'rxjs/operators';

import { ShippingAddress } from '../models/shipping-address';

import { AppConfigService } from './app-config.service';
import { ShippingAddressDto } from './dtos/shipping-address-dto';
import { ShippingAddressMapperService } from './mappers/shipping-address-mapper.service';

/** A stateful service that saves and manages data related to shipping address. */
@Injectable({
  providedIn: 'root',
})
export class ShippingAddressService {
  /** Shipping address of the current user. Null if the current user hasn't provided a shipping address. */
  public readonly shippingAddress$: Observable<ShippingAddress | null>;

  /** Shipping address url endpoint. */
  public readonly shippingAddressUrl: URL;

  /** Emit new value whenever shipping address changed. */
  private readonly shippingAddressChanged$ = new BehaviorSubject<void>(void 0);

  public constructor(
    private readonly appConfig: AppConfigService,
    private readonly shippingAddressMapper: ShippingAddressMapperService,
    private readonly http: HttpClient,
  ) {
    this.shippingAddressUrl = new URL('shipping-address', this.appConfig.apiUrl);
    this.shippingAddress$ = this.shippingAddressChanged$.pipe(
      switchMapTo(this.getShippingAddress()),
      shareReplay(1),
    );
  }

  /** Save shipping address.
   * @param shippingAddress The shipping address to save.*/
  public saveShippingAddress(shippingAddress: ShippingAddress): Observable<void> {
    const shippingAddressDto = this.shippingAddressMapper.toDto(shippingAddress);

    return this.http
      .put<void>(this.shippingAddressUrl.toString(), shippingAddressDto)
      .pipe(tap(() => this.shippingAddressChanged$.next()));
  }

  /** Get shipping address of the current user. */
  private getShippingAddress(): Observable<ShippingAddress | null> {
    return this.http
      .get<ShippingAddressDto | null>(this.shippingAddressUrl.toString())
      .pipe(
        map((response) =>
          response ? this.shippingAddressMapper.fromDto(response) : response,
        ),
      );
  }
}
