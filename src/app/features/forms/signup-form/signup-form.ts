import { Component, inject, signal } from '@angular/core';
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

@Component({
  selector: 'app-signup-form',
  imports: [ReactiveFormsModule, FormField, PasswordIcon],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.scss',
})
export class SignupForm {
  private readonly fb = inject(FormBuilder);

  constructor() {
    const lsFormData = localStorage.getItem(SIGNUP_LS_KEY);
    if (lsFormData) {
      this.signupForm.setValue(JSON.parse(lsFormData));
    }
  }

  signupForm: FormGroup<SignupFormInterface> = this.fb.nonNullable.group(
    {
      login: ['', [Validators.required, Validators.minLength(5)], [isTakenLogin]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required, isPasswordToShort, hasLetter, hasDigit]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: [isMatchPasswords] },
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
    console.log(this.signupForm.getRawValue());
    localStorage.removeItem(SIGNUP_LS_KEY);
  }
}
