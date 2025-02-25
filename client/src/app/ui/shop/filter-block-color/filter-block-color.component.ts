import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter } from '../../../shared/models/filter';

@Component({
  selector: 'app-filter-block-color',
  standalone: true,
  imports: [],
  templateUrl: './filter-block-color.component.html',
  styleUrl: './filter-block-color.component.scss',
})
export class FilterBlockColorComponent {
  // @Input() filters: {
  //   title: string;
  //   items: {
  //     name: string;
  //     label: string;
  //     count: number;
  //   }[];
  // }[] = [];
  @Input() filters: Filter[] = [];

  @Output() selectedColorsChange = new EventEmitter<string[]>();

  selectedColors: string[] = [];

  optionClicked(label: string) {
    const index = this.selectedColors.indexOf(label);
    if (index === -1) {
      this.selectedColors.push(label);
    } else {
      this.selectedColors.splice(index, 1);
    }
    this.selectedColorsChange.emit(this.selectedColors);
  }
}
