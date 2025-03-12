import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const emptyCartGuard: CanActivateFn = (route, state) => {
  const cartService = inject(CartService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (!cartService.cart() || cartService.cart()?.items.length === 0) {
    toastr.error('Your cart is empty', '', {
      progressBar: true,
      timeOut: 5000,
    });
    router.navigateByUrl('/cart');
    return false;
  }
  return true;
};
