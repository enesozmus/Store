import { Component, inject } from '@angular/core';
import { HeaderTopComponent } from './header-top/header-top.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { HeaderMainComponent } from './header-main/header-main.component';
import { BusyService } from '../../services/busy.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderTopComponent, HeaderNavComponent, HeaderMainComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  busyService = inject(BusyService);
}
