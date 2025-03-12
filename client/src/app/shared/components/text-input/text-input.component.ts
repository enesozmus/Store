import { Component, Input, Self } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type = 'text';

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  get control() {
    return this.controlDir.control as FormControl;
  }

  // <app-text-input label="Last name" formControlName="lastName" />
  // <app-text-input label="Email address" formControlName="email" />
  // <app-text-input label="Password" formControlName="password" type="password" />
}
