import { Component, OnInit } from '@angular/core';

import { HeaderComponent } from './ui/header/header.component';
import { HomeComponent } from './ui/home/home.component';
import { ShopComponent } from './ui/shop/shop.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, HomeComponent, ShopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // private http = inject(HttpClient);
  // baseUrl = 'https://localhost:5001/api/';
  // products: any[] = [];
  // products: Product[] = [];
  /**
   * 🔴
   */
  // constructor(private http: HttpClient) {}
  // constructor(private shopService: ShopService) {}
  // ngOnInit() {
  // this.shopService.getProducts().subscribe({
  //   next: (response) => (this.products = response.data),
  //   error: (error) => console.error(error),
  //   complete: () => console.log(''),
  // });
  // this.http.get(this.baseUrl + 'products').subscribe({
  //   next: (data) => console.log(data),
  //   error: (error) => console.error(error),
  //   complete: () => console.log('💚complete'),
  // });
  // this.http.get<any>(this.baseUrl + 'products').subscribe({
  //   next: (response) => (this.products = response.data),
  //   error: (error) => console.error(error),
  //   complete: () => console.log('💚complete'),
  // });
  // this.http.get<Pagination<Product>>(this.baseUrl + 'products').subscribe({
  //   next: (response) => (this.products = response.data),
  //   error: (error) => console.log(error),
  //   complete: () => console.log('🟢completed!'),
  // });
  // }
}
