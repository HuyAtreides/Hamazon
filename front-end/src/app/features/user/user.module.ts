import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AccountComponent } from './components/account/account.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CurrentPasswordDialogComponent } from './components/account/components/current-password-dialog/current-password-dialog.component';

/** Feature allows users to view and update their account info. */
@NgModule({
  declarations: [UserComponent, AccountComponent, OrdersComponent, CurrentPasswordDialogComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule, ReactiveFormsModule],
})
export class UserModule {}
