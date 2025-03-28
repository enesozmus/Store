import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  private accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  validationErrors?: string[];

  registerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => {
        this.toastr.success('Registration successful - you can now login', '', {
          progressBar: true,
          timeOut: 5000,
        });
        this.router.navigateByUrl('/account/login');
      },
      error: (errors) => (this.validationErrors = errors),
    });
  }
}
