import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SEARCH_CRITERIA_MAPPER } from './core/custom-injectors/injection-tokens/search-criteria-mapper';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { RefreshTokenInterceptor } from './core/interceptors/refresh-token.interceptor';
import { SearchByDateRangeMapperService } from './core/services/mappers/search-by-date-range-mapper.service';
import { SearchByGenreMapperService } from './core/services/mappers/search-by-genre-mapper.service';
import { SearchByTextMapperService } from './core/services/mappers/search-by-text-mapper.service';
import { SharedModule } from './shared/shared.module';

const httpInterceptorProviders = [
  // The refresh interceptor should be before the auth interceptor, otherwise refreshed bearer would not be updated
  { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

const searchCriteriaMapperProviders = [
  {
    provide: SEARCH_CRITERIA_MAPPER,
    useClass: SearchByDateRangeMapperService,
    multi: true,
  },
  { provide: SEARCH_CRITERIA_MAPPER, useClass: SearchByGenreMapperService, multi: true },
  { provide: SEARCH_CRITERIA_MAPPER, useClass: SearchByTextMapperService, multi: true },
];

/** Base app module. */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatNativeDateModule,
    SharedModule,
  ],
  providers: [...httpInterceptorProviders, ...searchCriteriaMapperProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
