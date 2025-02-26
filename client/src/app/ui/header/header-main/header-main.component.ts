import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../../../services/shop.service';

@Component({
  selector: 'app-header-main',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header-main.component.html',
  styleUrl: './header-main.component.scss',
})
export class HeaderMainComponent {
  dptMenu = false;
  showMenuButton = false;
  menuSwitch = false;
  search: string = '';

  constructor(private shopService: ShopService) {}

  ngOnInit() {
    console.log('HeaderMainComponent →', window.location.href);
    if (
      window.location.href === 'http://localhost:4200' ||
      window.location.href === 'http://localhost:4200/' ||
      window.location.href === 'http://localhost:4200/home'
    ) {
      this.dptMenu = true;
    } else {
      this.showMenuButton = true;
    }
  }

  onToggleMenu() {
    this.menuSwitch = !this.menuSwitch;
    this.dptMenu = !this.dptMenu;
  }

  onSearchChange() {
    // console.log('🟩🟩🟢1.HeaderMainComponent →', this.search);
    // console.log('🟩🟩🟢1.shopService.selectedSearch →', this.shopService.selectedSearch);
    this.shopService.selectedSearch = this.search;
    // console.log('🟩🟩🟢1.HeaderMainComponent →', this.search);
    // console.log('🟩🟩🟢1.shopService.selectedSearch →', this.shopService.selectedSearch);
    this.shopService.onButtonClick.next('');
  }
}
