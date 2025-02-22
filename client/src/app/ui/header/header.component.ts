import { Component } from '@angular/core';
import { HeaderTopComponent } from './header-top/header-top.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderTopComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
