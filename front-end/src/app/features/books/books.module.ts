import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { LayoutsModule } from 'src/app/layouts/layouts.module';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './components/books/books.component';

/** Contains components related to books feature. */
@NgModule({
  declarations: [BooksComponent],
  imports: [CommonModule, BooksRoutingModule, SharedModule, LayoutsModule],
})
export class BooksModule {}
