import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { NavbarHeaderComponent } from './components/navbar-header/navbar-header.component';

/** Contains layouts that will be used by many features. */
@NgModule({
  declarations: [NavbarHeaderComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [NavbarHeaderComponent],
})
export class LayoutsModule {}
