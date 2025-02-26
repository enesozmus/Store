import { Routes } from '@angular/router';
import { HomeComponent } from './ui/home/home.component';
import { ShopComponent } from './ui/shop/shop.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'shop',
    component: ShopComponent,
  },
  // {
  //   path: 'shop/:id',
  //   component: ProductDetailsComponent,
  // },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
