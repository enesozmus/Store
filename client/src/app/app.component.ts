import { Component } from '@angular/core';
import { HeaderComponent } from './ui/header/header.component';
import { HomeComponent } from "./ui/home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
