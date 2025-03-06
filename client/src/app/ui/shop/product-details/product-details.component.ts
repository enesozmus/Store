import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Product } from '../../../shared/models/product';
import { ShopService } from '../../../services/shop.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetailsComponent {
  product?: Product;

  private cartService = inject(CartService);
  quantityInCart = 0;
  quantity = 1;

  information = false;
  detail = false;
  custom = false;
  review = false;

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) return;
    this.shopService.getProduct(+id).subscribe({
      next: (product) => {
        this.product = product;
        this.updateQuantityInCart();
      },
      error: (error) => console.log(error),
    });
  }

  updateCart() {
    if (!this.product) return;

    if (this.quantity > this.quantityInCart) {
      const itemsToAdd = this.quantity - this.quantityInCart;
      this.quantityInCart += itemsToAdd;
      this.cartService.addItemToCart(this.product, itemsToAdd);
    } else {
      const itemsToRemove = this.quantityInCart - this.quantity;
      this.quantityInCart -= itemsToRemove;
      this.cartService.removeItemFromCart(this.product.id, itemsToRemove);
    }
  }

  updateQuantityInCart() {
    this.quantityInCart = this.cartService
                                      .cart()?.items
                                      .find((x) => x.productId === this.product?.id)?.quantity || 0;
    this.quantity = this.quantityInCart || 1;
  }

  getButtonText() {
    return this.quantityInCart > 0 ? 'Update cart' : 'Add to cart';
  }

  onHandleDecreaseByOne() {
    if (this.quantity > 1) {
      this.quantity--;
    }
    return;
  }
  onHandleIncreaseByOne() {
    this.quantity++;
  }

  onOpenInformation() {
    this.information = !this.information;
  }
  onOpenDetail() {
    this.detail = !this.detail;
  }
  onOpenCustom() {
    this.custom = !this.custom;
  }
  onOpenReview() {
    this.review = !this.review;
  }
}
