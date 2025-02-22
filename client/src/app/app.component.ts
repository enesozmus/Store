import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HeaderComponent } from './ui/header/header.component';
import { HomeComponent } from './ui/home/home.component';

import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api/';
  // products: any[] = [];
  products: Product[] = [];
  // private http = inject(HttpClient);

  /**
   * 🔴
   */
  constructor(private http: HttpClient) {}

  ngOnInit() {
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

    this.http.get<Pagination<Product>>(this.baseUrl + 'products').subscribe({
      next: (response) => (this.products = response.data),
      error: (error) => console.log(error),
      complete: () => console.log('🟢completed!'),
    });
  }
}
