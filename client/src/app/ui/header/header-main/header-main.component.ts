import { Component } from '@angular/core';

@Component({
  selector: 'app-header-main',
  standalone: true,
  imports: [],
  templateUrl: './header-main.component.html',
  styleUrl: './header-main.component.scss',
})
export class HeaderMainComponent {
  dptMenu = false;
  showMenuButton = false;
  menuSwitch = false;

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
}
