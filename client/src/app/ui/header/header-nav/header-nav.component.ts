import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.scss',
})
export class HeaderNavComponent {
  cartService = inject(CartService);
}
