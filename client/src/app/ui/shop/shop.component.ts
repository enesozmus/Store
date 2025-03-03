import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FilterBlockColorComponent } from './filter-block-color/filter-block-color.component';
import { FilterBlockComponent } from './filter-block/filter-block.component';
import { ShopItemComponent } from './shop-item/shop-item.component';

import { ShopService } from '../../services/shop.service';

import { Product } from '../../shared/models/product';
import { Filter } from '../../shared/models/filter';
import { Subscription } from 'rxjs';
import { ShopParams } from '../../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    FilterBlockComponent,
    FilterBlockColorComponent,
    ShopItemComponent,
    FormsModule,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  products: Product[] = [];
  shopParams = new ShopParams();

  count: number = 0;
  pageSize: number = 0;
  pageIndex: number = 0;

  numberOfPages: number = 0;
  // selectedPageIndex: number = 1;
  pageSizeOptions: number[] = [3, 6, 9, 12, 15, 18, 27];
  // selectedPageSize: number = 9;

  // selectedSearch: string = '';

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

  // selectedBrands: string[] = [];
  // selectedColors: string[] = [];
  // selectedSizes: string[] = [];
  // selectedTypes: string[] = [];

  selectedSort: string = 'Default';
  // selectedSortValue: string = 'default';
  sortOptions = [
    { name: 'Default', value: 'default' },
    { name: 'Alphabetical', value: 'orderByName' },
    { name: 'Price low-high', value: 'priceAsc' },
    { name: 'Price high-low', value: 'priceDesc' },
  ];

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

  private listenSubscriptionOnButtonClick: Subscription;

  constructor(private shopService: ShopService) {
    this.listenSubscriptionOnButtonClick =
      this.shopService.onButtonClick.subscribe(() => {
        this.onSearchChange();
      });
  }

  ngOnInit(): void {
    // console.log(this.selectedPageIndex);

    // this.shopService.getProducts().subscribe({
    //   next: (response) => {
    // this.products = response.data;

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
    //   },
    //   next: (response) => console.log('💚response', response.data),
    //   error: (error) => console.error(error),
    //   complete: () => console.log('💚complete'),
    // });

    // this.shopService
    //   .getProducts(this.selectedBrands, this.selectedColors, this.selectedTypes)
    //   .subscribe({
    //     next: (response) => (this.products = response.data),
    //     error: (error) => console.error(error),
    //     complete: () => console.log('getProducts(this.selectedBrands, this.selectedColors) 💚complete'),
    //   });

    this.applyFilters();

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
    });
  }

  onOpenFilterMenu() {}

  applyFilters() {
    this.shopService
      // .getProducts(
      //   this.selectedBrands,
      //   this.selectedColors,
      //   this.selectedTypes,
      //   this.selectedSortValue,
      //   this.selectedPageSize,
      //   this.selectedPageIndex,
      //   this.selectedSearch
      // )
      .getProducts(this.shopParams)
      .subscribe({
        next: (response) => {
          this.products = response.data;
          this.count = response.count;
          this.pageSize = response.pageSize;
          this.pageIndex = response.pageIndex;
          this.numberOfPages = Math.ceil(response.count / response.pageSize);
          // console.log(response.count / response.pageSize);
          // console.log('numberOfPages', this.numberOfPages);
        },
        error: (error) => console.error(error),
      });
  }

  onTest1(selectedBrands: string[]) {
    // this.selectedBrands = selectedBrands;
    this.shopParams.brands = selectedBrands;
    this.shopParams.pageIndex = 1;
    this.applyFilters();
    // console.log('🟥onTest1', selectedBrands);
  }

  onTest2(selectedSizes: string[]) {
    // console.log('🟦onTest2', selectedSizes);
  }

  onTest3(selectedTypes: string[]) {
    // this.selectedTypes = selectedTypes;
    this.shopParams.types = selectedTypes;
    this.shopParams.pageIndex = 1;
    this.applyFilters();
    // console.log('⬛onTest3', selectedTypes);
  }

  onTest4(selectedColors: string[]) {
    // this.selectedColors = selectedColors;
    this.shopParams.colors = selectedColors;
    this.shopParams.pageIndex = 1;
    this.applyFilters();
    // console.log('🟪onTest4', selectedColors);
  }

  onSortChange(name: string, value: string) {
    this.selectedSort = name;
    // this.selectedSortValue = value;
    this.shopParams.sort = value;
    // this.shopParams.pageIndex = 1;
    // console.log('🟨onSortChange', name, value);
    // console.log('🟨onSortChange', this.selectedSortValue);
    this.applyFilters();
  }

  onSetIndex(index: number) {
    // this.selectedPageIndex = index + 1;
    this.shopParams.pageIndex = index + 1;
    // console.log('selectedIndex after → ', this.selectedPageIndex);
    this.applyFilters();
  }

  onSetIndexIncrease() {
    // if (this.selectedPageIndex + 1 <= this.numberOfPages) {
    //   this.selectedPageIndex++;
    //   this.applyFilters();
    // }
    if (this.shopParams.pageIndex + 1 <= this.numberOfPages) {
      this.shopParams.pageIndex++;
      this.applyFilters();
    }
  }

  onSetIndexDecrease() {
    // if (this.selectedPageIndex != 1) {
    //   this.selectedPageIndex--;
    //   this.applyFilters();
    // }
    if (this.shopParams.pageIndex != 1) {
      this.shopParams.pageIndex--;
      this.applyFilters();
    }
  }

  onPageSizeChange(size: number) {
    // this.selectedPageSize = size;
    this.shopParams.pageSize = size;
    this.shopParams.pageIndex = 1;
    this.applyFilters();
  }

  onSearchChange() {
    // console.log('🟥🟥🟥🟥🟥🟥here');
    // console.log('🟥3.ShopComponent this.selectedSearch→', this.selectedSearch);
    // console.log('🟥3.ShopComponent this.shopService.selectedSearch→', this.shopService.selectedSearch);

    // this.selectedSearch = this.shopService.selectedSearch;
    // this.selectedPageIndex = 1;

    this.shopParams.search = this.shopService.selectedSearch;
    this.shopParams.pageIndex = 1;

    // console.log('🟥3.ShopComponent this.selectedSearch→', this.selectedSearch);
    // console.log('🟥3.ShopComponent this.shopService.selectedSearch→', this.shopService.selectedSearch);
    this.applyFilters();
  }

  ngOnDestroy() {
    this.listenSubscriptionOnButtonClick.unsubscribe();
    // this.listenSubscriptionGetBrands.unsubscribe();
    // this.listenSubscriptionGetColors.unsubscribe();
    // this.listenSubscriptionGetTypes.unsubscribe();
    // this.listenSubscriptionGetProducts.unsubscribe();
  }
}
