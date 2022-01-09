/** Available field used for ordering books. */
export enum BookOrderField {
  Title = 'title',
  Price = 'price',
  PublicationDate = 'published',
}

export namespace BookOrderField {
  const TO_READABLE_MAP: Readonly<Record<BookOrderField, string>> = {
    [BookOrderField.Price]: 'Price',
    [BookOrderField.Title]: 'Title',
    [BookOrderField.PublicationDate]: 'Publication Date',
  };

  /**
   * Maps to enum value into a human-readable representation of it.
   * @param field Enum value to map into readable one.
   */
  export function toReadable(field: BookOrderField): string {
    return TO_READABLE_MAP[field];
  }
}
