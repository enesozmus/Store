import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  // private http = inject(HttpClient);
  baseUrl = 'https://localhost:5001/api/';
  // products: any[] = [];
  // products: Product[] = [];

  // brands: Filter[] = [];
  
  onButtonClick = new Subject();
  selectedSearch: string = '';

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
    sort?: string,
    pageSize?: number,
    pageIndex?: number,
    search?: string
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

    if (pageSize) {
      params = params.append('pageSize', pageSize);
    }
    if (pageIndex) {
      params = params.append('pageIndex', pageIndex);
    }

    if (search) {
      // search = this.selectedSearch;
      // console.log('🟦🟦🔵2ShopService →', search);
      // console.log('🟦🟦🔵2this.selectedSearch →', this.selectedSearch);
      params = params.append('search', search);
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
