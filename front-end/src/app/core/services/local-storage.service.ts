import { Injectable } from '@angular/core';

/** Service that interacts with browser local storage. */
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  /** Get a item from local storage by key.
   * @param key Key used to get the item.
   */
  public getItem<T>(key: string): T | null {
    const rawItem = localStorage.getItem(key);
    return rawItem ? (JSON.parse(rawItem) as T) : null;
  }

  /**
   * Save a item to storage.
   * @param key Key.
   * @param item Item to save.
   */
  public saveItem<T>(key: string, item: T): void {
    localStorage.setItem(key, JSON.stringify(item));
  }

  /**
   * Removed data from storage.
   * @param key Key.
   */
  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
