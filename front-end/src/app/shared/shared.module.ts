import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

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
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [MaterialModule, ...EXPORTED_DECLARATIONS],
})
export class SharedModule {}
