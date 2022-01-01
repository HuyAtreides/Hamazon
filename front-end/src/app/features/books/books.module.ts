import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { LayoutsModule } from 'src/app/layouts/layouts.module';

import { ReactiveFormsModule } from '@angular/forms';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { BooksSidebarComponent } from './components/books-sidebar/books-sidebar.component';
import { BooksListComponent } from './components/books-list/books-list.component';

/** Contains components related to books feature. */
@NgModule({
  declarations: [BooksComponent, BooksSidebarComponent, BooksListComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    SharedModule,
    LayoutsModule,
    ReactiveFormsModule,
  ],
})
export class BooksModule {}
