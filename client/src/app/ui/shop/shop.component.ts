import { Component } from '@angular/core';

import { FilterBlockColorComponent } from './filter-block-color/filter-block-color.component';
import { FilterBlockComponent } from './filter-block/filter-block.component';

import { ShopService } from '../../services/shop.service';

import { Product } from '../../shared/models/product';
import { Filter } from '../../shared/models/filter';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [FilterBlockComponent, FilterBlockColorComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  products: Product[] = [];
  brands: Filter[] = [];
  colors: Filter[] = [];
  sizes: {
    title: string;
    items: {
      name: string;
      label: string;
      count: number;
    }[];
  }[] = [
    {
      title: 'Sizes',
      items: [
        { name: '3XL', label: '3XL', count: 15 },
        { name: '2XL', label: '2XL', count: 15 },
        { name: 'XL', label: 'XL', count: 15 },
        { name: 'L', label: 'L', count: 15 },
        { name: 'M', label: 'M', count: 15 },
        { name: 'S', label: 'S', count: 15 },
        { name: 'XS', label: 'XS', count: 15 },
      ],
    },
  ];
  types: Filter[] = [];

  brandsArray: string[] = [];
  colorsArray: string[] = [];
  typesArray: string[] = [];
  showMenu = false;

  // brands: {
  //   title: string;
  //   items: {
  //     name: string;
  //     label: string;
  //     count: number;
  //   }[];
  // }[] = [
  // {
  //   title: 'Brands',
  //   items: [
  //     { name: 'Dior', label: 'dior', count: 15 },
  //     { name: 'Gucci', label: 'gucci', count: 15 },
  //     { name: 'Zara', label: 'zara', count: 15 },
  //     { name: 'Chanel', label: 'chanel', count: 15 },
  //     { name: 'Cartier', label: 'cartier', count: 15 },
  //   ],
  // },
  // ];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.shopService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;

        // for (let index = 0; index < this.products.length; index++) {
        //   this.brands.push({
        //     title: 'Brands',
        //     items: [
        //       {
        //         name: this.products[index].brand,
        //         label: this.products[index].brand.toLowerCase(),
        //         count: 15,
        //       },
        //     ],
        //   });
        //   this.brands[0].items[index].name = this.products[index].brand;
        //   this.brands[0].items[index].label =
        //     this.products[index].brand.toLowerCase();
        //   this.brands[0].items[index].count = 15;
        // }

        // for (let index = 0; index < this.products.length; index++) {
        //   this.colors.push({
        //     title: 'Colors',
        //     items: [
        //       {
        //         name: this.products[index].color,
        //         label: this.products[index].color.toLowerCase(),
        //         count: 15,
        //       },
        //     ],
        //   });
        // }

        // for (let index = 0; index < this.products.length; index++) {
        //   this.types.push({
        //     title: 'Types',
        //     items: [
        //       {
        //         name: this.products[index].type,
        //         label: this.products[index].type.toLowerCase(),
        //         count: 15,
        //       },
        //     ],
        //   });
        // }
      },
      // next: (response) => console.log('💚response', response.data),
      error: (error) => console.error(error),
      complete: () => console.log('💚complete'),
    });

    this.shopService.getBrands().subscribe({
      next: (brands) => {
        this.brandsArray = brands;
        this.brands.push({ title: 'Brands', items: [] });

        for (let index = 0; index < this.brandsArray.length; index++) {
          this.brands[0].items.push({
            name: this.brandsArray[index],
            label: this.brandsArray[index].toLowerCase(),
            count: 15,
          });
        }
      },
      error: (error) => console.error(error),
      complete: () => console.log('💚complete'),
    });

    this.shopService.getColors().subscribe({
      next: (colors) => {
        this.colorsArray = colors;
        this.colors.push({ title: 'Colors', items: [] });

        for (let index = 0; index < this.colorsArray.length; index++) {
          this.colors[0].items.push({
            name: this.colorsArray[index],
            label: this.colorsArray[index].toLowerCase(),
            count: 15,
          });
        }
      },
      error: (error) => console.error(error),
      complete: () => console.log('💚complete'),
    });

    this.shopService.getTypes().subscribe({
      next: (types) => {
        this.typesArray = types;
        this.types.push({ title: 'Types', items: [] });

        for (let index = 0; index < this.types.length; index++) {
          this.types[0].items.push({
            name: this.typesArray[index],
            label: this.typesArray[index].toLowerCase(),
            count: 15,
          });
        }
      },
      error: (error) => console.error(error),
      complete: () => console.log('💚complete'),
    });
  }

  onOpenFilterMenu() {
    
  }
}
