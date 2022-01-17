import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartItemQuantityComponent } from './components/cart-item-quantity/cart-item-quantity.component';

/** Feature allows viewing cart items and adjust cart item amount. */
@NgModule({
  declarations: [CartComponent, CartItemQuantityComponent],
  imports: [CommonModule, CartRoutingModule, SharedModule, ReactiveFormsModule],
})
export class CartModule {}
