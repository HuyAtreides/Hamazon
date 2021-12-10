import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const EXPORTED_MODULE = [
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
];

/**
 * Material modules
 * Contains imported angular material module.
 */
@NgModule({
  declarations: [],
  imports: [CommonModule, ...EXPORTED_MODULE],
  exports: [...EXPORTED_MODULE],
})
export class MaterialModule {}
