import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginFormInterface } from '../models/forms.model';
import { FormField } from '../../../shared/ui/form-field/form-field';
import { PasswordIcon } from '../../../shared/ui/password-icon/password-icon';
import { AuthService } from '../../../pages/auth/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, FormField, PasswordIcon],
  templateUrl: './login-form.html',
  styleUrl: '../login-form/login-form.scss',
})
export class LoginForm implements OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  private subscription!: Subscription;

  loginForm: FormGroup<LoginFormInterface> = this.fb.nonNullable.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  showPassword = signal(false);

  isPendingRequest = signal(false);

  get login() {
    return this.loginForm.controls.login;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  togglePassword() {
    this.showPassword.update((value) => !value);
  }

  onSubmit() {
    this.isPendingRequest.set(true);
    this.subscription = this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (response) => {
        if (response.ok && response.body) {
          this.authService.saveToken(response.body.token);
          this.router.navigate(['']);
        }
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse)
          this.loginForm.setErrors({ loginError: { message: error.error.message } });
        else if (error instanceof Error)
          this.loginForm.setErrors({ loginError: { message: error.message } });
        else this.loginForm.setErrors({ loginError: { message: 'Unknown error' } });
        this.isPendingRequest.set(false);
      },
    });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
