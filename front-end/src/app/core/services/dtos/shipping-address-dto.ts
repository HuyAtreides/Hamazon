/** Shipping address DTO. */
export interface ShippingAddressDto {
  /** Uniquely identify a shipping address. */
  readonly id: number | null;

  /** User full name. */
  readonly fullname: string;

  /** User country. */
  readonly country: string;

  /** User phone number. */
  readonly phoneNumber: string;

  /** User address. */
  readonly address: string;

  /** User city. */
  readonly city: string;

  /** User note. */
  readonly note: string | null;
}
