import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

import { CartService } from '../../services/cart.service';

import { CartItemComponent } from './cart-item/cart-item.component';
import { EmptyStateComponent } from "../../shared/components/empty-state/empty-state.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CartItemComponent, CurrencyPipe, EmptyStateComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartService = inject(CartService);
  flat: boolean = true;

  flatShipping() {
    this.flat = true;
    const totals = this.cartService.totals();
    if (totals) {
      totals.shipping = 10;
      totals.total+= 10;
    }
  }

  bestShipping() {
    this.flat = false;
    const totals = this.cartService.totals();
    if (totals) {
      totals.shipping = 0;
      totals.total-= 10;
    }
  }
}
