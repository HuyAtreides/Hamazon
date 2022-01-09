/** Book genre. */
export enum Genre {
  Manga = 'manga',
  Adventure = 'adventure',
  History = 'history',
  Horror = 'horror',
  Travel = 'travel',
  Art = 'art',
  Business = 'business',
  Mystery = 'mystery',
  Fantasy = 'fantasy',
  Thriller = 'thriller',
  Comics = 'comics',
  SciFi = 'science-fiction',
  NonFiction = 'non-fiction',
  Science = 'science',
  Biography = 'biography',
}

export namespace Genre {
  const TO_READABLE_MAP: Readonly<Record<Genre, string>> = {
    [Genre.Adventure]: 'Adventure',
    [Genre.History]: 'History',
    [Genre.Horror]: 'Horror',
    [Genre.Travel]: 'Travel',
    [Genre.Art]: 'Art',
    [Genre.Business]: 'Business',
    [Genre.Mystery]: 'Mystery',
    [Genre.Fantasy]: 'Fantasy',
    [Genre.Thriller]: 'Thriller',
    [Genre.Comics]: 'Comics',
    [Genre.SciFi]: 'Sci-Fi',
    [Genre.NonFiction]: 'Non-Fiction',
    [Genre.Science]: 'Science',
    [Genre.Biography]: 'Biography',
    [Genre.Manga]: 'Manga',
  };

  /**
   * Maps to enum value into a human-readable representation of it.
   * @param genre Enum value to map into readable one.
   */
  export function toReadable(genre: Genre): string {
    return TO_READABLE_MAP[genre];
  }
}
