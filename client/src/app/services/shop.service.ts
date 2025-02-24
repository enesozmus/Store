import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  // private http = inject(HttpClient);
  baseUrl = 'https://localhost:5001/api/';
  // products: any[] = [];
  // products: Product[] = [];

  // brands: Filter[] = [];

  /**
   * 🔴
   */
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Pagination<Product>>(this.baseUrl + 'products');
  }

  getBrands() {
    // if (this.brands.length > 0) return;
    return this.http.get<string[]>(this.baseUrl + 'products/brands');
    // return this.http
    //   .get<string[]>(this.baseUrl + 'products/brands')
    //   .subscribe((response) => (this.brands = response));
  }
  getColors() {
    return this.http.get<string[]>(this.baseUrl + 'products/colors');
  }
  getTypes() {
    return this.http.get<string[]>(this.baseUrl + 'products/types');
  }
}
