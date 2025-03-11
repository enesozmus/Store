import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { CartService } from '../../../services/cart.service';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CurrencyPipe],
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.scss',
})
export class HeaderNavComponent {
  cartService = inject(CartService);
  accountService = inject(AccountService);
  private router = inject(Router);

  dropdownMenu = false;

  logout() {
    this.accountService.logout().subscribe({
      next: () => {
        this.accountService.currentUser.set(null);
        this.router.navigateByUrl('/');
      },
    });
  }

  onToggleMenu() {
    this.dropdownMenu = !this.dropdownMenu;
    console.log('here');
  }
}
