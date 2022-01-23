import { CartItemDto } from './cart-item-dto';
import { ShippingAddressDto } from './shipping-address-dto';

/** Order item DTO. */
export interface OrderItemDto extends CartItemDto {
  /** Date at which this item was placed.
   * @example 2007-07-25
   */
  readonly placedIn: string;

  /** Shipping address of this order item. */
  readonly shippingAddress: ShippingAddressDto;
}
