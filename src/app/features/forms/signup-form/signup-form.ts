import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupFormInterface } from '../models/forms.model';
import { FormField } from '../../../shared/ui/form-field/form-field';
import { PasswordIcon } from '../../../shared/ui/password-icon/password-icon';
import {
  hasDigit,
  hasLetter,
  isMatchPasswords,
  isPasswordToShort,
  isTakenLogin,
} from '../../utils/validators';
import { SIGNUP_LS_KEY } from '../../../shared/constants/constants';
import { AuthService } from '../../../pages/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  imports: [ReactiveFormsModule, FormField, PasswordIcon],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.scss',
})
export class SignupForm implements OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  constructor() {
    const lsFormData = localStorage.getItem(SIGNUP_LS_KEY);
    if (lsFormData) {
      this.signupForm.setValue(JSON.parse(lsFormData));
    }
  }

  private subscription!: Subscription;

  signupForm: FormGroup<SignupFormInterface> = this.fb.nonNullable.group(
    {
      login: ['', [Validators.required, Validators.minLength(5)], [isTakenLogin]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required, isPasswordToShort, hasLetter, hasDigit]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: [isMatchPasswords('password', 'confirmPassword')] },
  );

  showPassword = signal(false);
  showConfirmPassword = signal(false);

  isPendingRequest = signal(false);

  get login() {
    return this.signupForm.controls.login;
  }

  get firstName() {
    return this.signupForm.controls.firstName;
  }

  get lastName() {
    return this.signupForm.controls.lastName;
  }

  get password() {
    return this.signupForm.controls.password;
  }

  get confirmPassword() {
    return this.signupForm.controls.confirmPassword;
  }

  togglePassword() {
    this.showPassword.update((value) => !value);
  }

  toggleConfirmPassword() {
    this.showConfirmPassword.update((value) => !value);
  }

  generatePasswordValidationErrors() {
    const { errors } = this.password;
    if (!errors) return '';
    const passwordRequirements = Object.entries(errors)
      .map((error) => error[1].message)
      .filter(Boolean)
      .join(', ');
    return `Password should contains ${passwordRequirements}.`;
  }

  onChange() {
    localStorage.setItem(SIGNUP_LS_KEY, JSON.stringify(this.signupForm.getRawValue()));
  }

  onSubmit() {
    this.isPendingRequest.set(true);
    this.subscription = this.authService.signup(this.signupForm.getRawValue()).subscribe({
      next: (response) => {
        if (response.status === 201) {
          localStorage.removeItem(SIGNUP_LS_KEY);
          this.router.navigate(['auth', 'login']);
        }
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse)
          this.signupForm.setErrors({ signUpError: { message: error.error.message } });
        else if (error instanceof Error)
          this.signupForm.setErrors({ signUpError: { message: error.message } });
        else this.signupForm.setErrors({ signUpError: { message: 'Unknown error' } });
        this.isPendingRequest.set(false);
      },
    });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
