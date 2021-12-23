import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * App config service.
 * Provides information about current application environment configuration.
 */
@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  /** API base url. */
  public readonly apiUrl = environment.baseUrl;
}
