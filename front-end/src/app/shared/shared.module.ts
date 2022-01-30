import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './modules/material/material.module';
import { FormControlValidationMessageComponent } from './components/form-control-validation-message/form-control-validation-message.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SortPipe } from './pipes/sort.pipe';
import { MessageSnackBarComponent } from './components/message-snack-bar/message-snack-bar.component';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { ShippingAddressInfoComponent } from './components/shipping-address-info/shipping-address-info.component';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { BookInfoComponent } from './components/book-info/book-info.component';

const EXPORTED_DECLARATIONS = [
  FormControlValidationMessageComponent,
  NavbarComponent,
  SortPipe,
  MessageSnackBarComponent,
  ShippingAddressComponent,
  InfiniteScrollDirective,
  ShippingAddressInfoComponent,
  BookInfoComponent,
];

/**
 * Shared module.
 * Contains reusable components, directives and modules can be shared through the whole app.
 */
@NgModule({
  declarations: [...EXPORTED_DECLARATIONS],
  imports: [CommonModule, MaterialModule, RouterModule, ReactiveFormsModule],
  exports: [MaterialModule, ...EXPORTED_DECLARATIONS],
})
export class SharedModule {}
