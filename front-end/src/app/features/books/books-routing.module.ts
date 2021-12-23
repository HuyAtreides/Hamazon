import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksComponent } from './components/books/books.component';

const routes: Routes = [
  {
    path: 'books',
    component: BooksComponent,
  },
];

/** Books feature routing module. */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
