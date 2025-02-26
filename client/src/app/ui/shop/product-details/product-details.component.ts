import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../../../services/shop.service';
import { Product } from '../../../shared/models/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  product?: Product;

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
}
