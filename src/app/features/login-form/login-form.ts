import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormField } from '../../shared/ui/form-field/form-field';
import { NgOptimizedImage } from '@angular/common';

interface LoginFormInterface {
  login: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, NgOptimizedImage, FormField],
  templateUrl: './login-form.html',
  styleUrl: '../login-form/login-form.scss',
})
export class LoginForm {
  fb = inject(FormBuilder);

  loginForm: FormGroup<LoginFormInterface> = this.fb.nonNullable.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  showPassword = signal(false);

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
    console.log(this.loginForm.getRawValue());
  }
}
