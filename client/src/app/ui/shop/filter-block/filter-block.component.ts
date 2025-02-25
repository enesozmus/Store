import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter } from '../../../shared/models/filter';

@Component({
  selector: 'app-filter-block',
  standalone: true,
  imports: [],
  templateUrl: './filter-block.component.html',
  styleUrl: './filter-block.component.scss',
})
export class FilterBlockComponent {
  // @Input() filters: {
  //   title: string;
  //   items: {
  //     name: string;
  //     label: string;
  //     count: number;
  //   }[];
  // }[] = [];
  @Input() filters: Filter[] = [];

  @Output() selectedBrandsChange = new EventEmitter<string[]>();
  @Output() selectedSizesChange = new EventEmitter<string[]>();
  @Output() selectedTypesChange = new EventEmitter<string[]>();

  selectedBrands: string[] = [];
  selectedSizes: string[] = [];
  selectedTypes: string[] = [];

  optionClicked(title: string, label: string) {
    // console.log(title, label);
    // console.log('1', this.selectedBrands);
    // console.log('1', this.selectedSizes);
    // console.log('2', this.selectedTypes);

    if (title === 'Brands') {
      const index = this.selectedBrands.indexOf(label);
      if (index === -1) {
        this.selectedBrands.push(label);
      } else {
        this.selectedBrands.splice(index, 1);
      }
      this.selectedBrandsChange.emit(this.selectedBrands);
    }

    if (title === 'Sizes') {
      const index = this.selectedSizes.indexOf(label);
      if (index === -1) {
        this.selectedSizes.push(label);
      } else {
        this.selectedSizes.splice(index, 1);
      }
      this.selectedSizesChange.emit(this.selectedSizes);
    }

    if (title === 'Types') {
      const index = this.selectedTypes.indexOf(label);
      if (index === -1) {
        this.selectedTypes.push(label);
      } else {
        this.selectedTypes.splice(index, 1);
      }
      this.selectedTypesChange.emit(this.selectedTypes);
    }

    // if (title == 'Brands') {
    //   if (this.selectedBrands.includes(label)) {
    //     this.selectedBrands = this.selectedBrands.filter(
    //       (brand) => brand !== label
    //     );
    //   } else {
    //     this.selectedBrands.push(label);
    //   }
    // }

    // if (title == 'Sizes') {
    //   if (this.selectedSizes.includes(label)) {
    //     this.selectedSizes = this.selectedSizes.filter(
    //       (size) => size !== label
    //     );
    //   } else {
    //     this.selectedSizes.push(label);
    //   }
    // }

    // if (title == 'Types') {
    //   if (this.selectedTypes.includes(label)) {
    //     this.selectedTypes = this.selectedTypes.filter(
    //       (type) => type !== label
    //     );
    //   } else {
    //     this.selectedTypes.push(label);
    //   }
    // }

    // console.log('2', this.selectedBrands);
    // console.log('2', this.selectedSizes);
    // console.log('2', this.selectedTypes);
  }
}
