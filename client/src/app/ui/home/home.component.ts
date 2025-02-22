import { Component } from '@angular/core';
import { SliderComponent } from './slider/slider.component';
import { BrandContainerComponent } from './brand-container/brand-container.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, BrandContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
