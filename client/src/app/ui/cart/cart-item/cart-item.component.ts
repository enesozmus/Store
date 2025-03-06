import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartItem } from '../../../shared/models/cart';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  item = input.required<CartItem>();
  cartService = inject(CartService);

  decrementQuantity() {
    this.cartService.removeItemFromCart(this.item().productId);
  }

  incrementQuantity() {
    this.cartService.addItemToCart(this.item());
  }

  removeItemFromCart() {
    this.cartService.removeItemFromCart(
      this.item().productId,
      this.item().quantity
    );
  }
}
