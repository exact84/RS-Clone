import { FormControl } from '@angular/forms';

export interface LoginFormInterface {
  login: FormControl<string>;
  password: FormControl<string>;
}

export interface SignupFormInterface {
  login: FormControl<string>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

export interface UpdatePasswordFormInterface {
  oldPassword: FormControl<string>;
  newPassword: FormControl<string>;
  confirmNewPassword: FormControl<string>;
}
