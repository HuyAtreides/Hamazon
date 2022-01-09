/** Order direction. */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export namespace OrderDirection {
  const TO_READABLE_MAP: Readonly<Record<OrderDirection, string>> = {
    [OrderDirection.Asc]: 'Ascending',
    [OrderDirection.Desc]: 'Descending',
  };

  /**
   * Maps to enum value into a human-readable representation of it.
   * @param direction Enum value to map into readable one.
   */
  export function toReadable(direction: OrderDirection): string {
    return TO_READABLE_MAP[direction];
  }
}
