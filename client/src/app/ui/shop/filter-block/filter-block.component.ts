import { Component, Input } from '@angular/core';
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
}
