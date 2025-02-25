import { HttpClient, HttpParams } from '@angular/common/http';
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

  // getProducts() {
  //   return this.http.get<Pagination<Product>>(this.baseUrl + 'products');
  // }

  getProducts(
    brands?: string[],
    colors?: string[],
    types?: string[],
    sort?: string
  ) {
    let params = new HttpParams();
    // console.log('service');
    // console.log('service → brands', brands);

    if (brands && brands.length > 0) {
      params = params.append('brands', brands.join(','));
    }
    if (colors && colors.length > 0) {
      params = params.append('colors', colors.join(','));
    }
    if (types && types.length > 0) {
      params = params.append('types', types.join(','));
    }
    if (sort) {
      params = params.append('sort', sort);
    }

    return this.http.get<Pagination<Product>>(this.baseUrl + 'products', {
      params,
    });
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
