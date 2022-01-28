import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ShippingAddress } from 'src/app/core/models/shipping-address';

/** A dummy component used to display shipping address info. */
@Component({
  selector: 'app-shipping-address-info',
  templateUrl: './shipping-address-info.component.html',
  styleUrls: ['./shipping-address-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShippingAddressInfoComponent  {

  /** Shipping address to display. */
  @Input()
  public shippingAddress!: ShippingAddress | null;

}
