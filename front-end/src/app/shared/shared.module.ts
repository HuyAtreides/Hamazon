import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from './modules/material/material.module';
import { FormControlValidationMessageComponent } from './components/form-control-validation-message/form-control-validation-message.component';

import { NavbarComponent } from './components/navbar/navbar.component';

const EXPORTED_DECLARATIONS = [FormControlValidationMessageComponent, NavbarComponent];

/**
 * Shared module.
 * Contains reusable components, directives and modules can be shared through the whole app.
 */
@NgModule({
  declarations: [...EXPORTED_DECLARATIONS],
  imports: [CommonModule, MaterialModule, BrowserAnimationsModule, BrowserModule],
  exports: [MaterialModule, ...EXPORTED_DECLARATIONS],
})
export class SharedModule {}
