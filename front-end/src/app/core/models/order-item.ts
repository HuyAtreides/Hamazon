import { Item } from './item';
import { ShippingAddress } from './shipping-address';

/** Represent a specific item in an order. */
export interface OrderItem extends Item {
  /** Date at which this item was placed. */
  readonly placedIn: Date;

  /** Shipping address of this order item. */
  readonly shippingAddress: ShippingAddress;
}
