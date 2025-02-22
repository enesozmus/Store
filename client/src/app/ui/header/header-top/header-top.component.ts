import { Component } from '@angular/core';

@Component({
  selector: 'app-header-top',
  standalone: true,
  imports: [],
  templateUrl: './header-top.component.html',
  styleUrl: './header-top.component.scss',
})
export class HeaderTopComponent {
  currentLanguage: string = 'English';
  languages: string[] = [
    'English',
    'Turkish',
    'Russian',
    'German',
    'Spanish',
    'French',
    'Polish',
  ];
  isActiveLanguage: boolean = false;

  currentCurrency: string = 'USD';
  currencies: string[] = ['USD', 'TRY', 'RUB', 'EUR', 'GBP', 'PLN'];
  isActiveCurrency: boolean = false;

  toggleLanguages(selectedLanguage: string) {
    this.currentLanguage = selectedLanguage;
    this.isActiveLanguage = !this.isActiveLanguage;
  }

  toggleCurrencies(selectedCurrency: string) {
    this.currentCurrency = selectedCurrency;
    this.isActiveCurrency = !this.isActiveCurrency;
  }
}
