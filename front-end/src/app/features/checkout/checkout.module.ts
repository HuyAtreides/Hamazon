import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { ReviewOrderComponent } from './components/review-order/review-order.component';

/** Checkout feature. Allows user to place orders. */
@NgModule({
  declarations: [CheckoutComponent, ReviewOrderComponent],
  imports: [CommonModule, CheckoutRoutingModule, SharedModule, ReactiveFormsModule],
})
export class CheckoutModule {}
