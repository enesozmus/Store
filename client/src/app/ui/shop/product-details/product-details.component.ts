import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ShopService } from '../../../services/shop.service';
import { Product } from '../../../shared/models/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetailsComponent {
  product?: Product;

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
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onHandleAddToCart() {}
  onHandleDecreaseByOne() {}
  onHandleIncreaseByOne() {}

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
