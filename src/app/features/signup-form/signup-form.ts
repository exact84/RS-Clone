import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { isMatchPasswords } from '../utils/validators';
import { NgOptimizedImage } from '@angular/common';
import { FormField } from '../../shared/ui/form-field/form-field';

interface SignupFormInterface {
  login: FormControl<string>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

@Component({
  selector: 'app-signup-form',
  imports: [ReactiveFormsModule, NgOptimizedImage, FormField],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.scss',
})
export class SignupForm {
  private readonly fb = inject(FormBuilder);

  signupForm: FormGroup<SignupFormInterface> = this.fb.nonNullable.group(
    {
      login: ['', [Validators.required, Validators.minLength(5)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: [isMatchPasswords], updateOn: 'blur' },
  );

  showPassword = signal(false);
  showConfirmPassword = signal(false);

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

  onSubmit() {
    console.log(this.signupForm.getRawValue());
  }
}
