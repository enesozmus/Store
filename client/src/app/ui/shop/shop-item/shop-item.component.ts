import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { HoverableComponent } from '../../../shared/components/hoverable/hoverable.component';
import { DiscountComponent } from '../../../shared/components/discount/discount.component';
import { RatingComponent } from '../../../shared/components/rating/rating.component';
import { PriceComponent } from '../../../shared/components/price/price.component';

import { Product } from '../../../shared/models/product';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-shop-item',
  standalone: true,
  imports: [
    HoverableComponent,
    DiscountComponent,
    RatingComponent,
    PriceComponent,
    RouterLink,
  ],
  templateUrl: './shop-item.component.html',
  styleUrl: './shop-item.component.scss',
})
export class ShopItemComponent {
  @Input() items: Product[] = [];
  cartService = inject(CartService);
  // productId: number = 1;

  constructor(private router: Router) {}

  navigate(productId: number) {
    // this.router.navigate([path]);
    // this.router.navigate([`product-details/${this.items[5].Id}`]);
    // this.productId = productId;
    // this.router.navigate([`product-details/${productId}`]);
  }
}
