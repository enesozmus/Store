import { Routes } from '@angular/router';

import { HomeComponent } from './ui/home/home.component';

import { ShopComponent } from './ui/shop/shop.component';
import { ProductDetailsComponent } from './ui/shop/product-details/product-details.component';

import { CartComponent } from './ui/cart/cart.component';

import { RegisterComponent } from './ui/account/register/register.component';
import { LoginComponent } from './ui/account/login/login.component';

import { TestErrorComponent } from './shared/test-error/test-error.component';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';
import { ServerErrorComponent } from './shared/components/errors/server-error/server-error.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'shop',
    component: ShopComponent,
  },
  {
    path: 'shop/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'account/register',
    component: RegisterComponent,
  },
  {
    path: 'account/login',
    component: LoginComponent,
  },
  {
    path: 'test-error',
    component: TestErrorComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: 'server-error',
    component: ServerErrorComponent,
  },
  // {
  //   path: '**',
  //   redirectTo: '',
  //   pathMatch: 'full',
  // },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },
];
