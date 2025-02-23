import { Component, Input } from '@angular/core';
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
}
