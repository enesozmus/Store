import { Component } from '@angular/core';

@Component({
  selector: 'app-header-main',
  standalone: true,
  imports: [],
  templateUrl: './header-main.component.html',
  styleUrl: './header-main.component.scss',
})
export class HeaderMainComponent {
  showMenuButton = false;
  menuSwitch = false;

  onToggleMenu() {
    this.menuSwitch = !this.menuSwitch;
  }
}
