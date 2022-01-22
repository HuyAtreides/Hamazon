import { Item } from './item';

/** Represent a specific item in an order. */
export interface OrderItem extends Item {
  /** Date at which this item was placed. */
  readonly placedIn: Date;
}
