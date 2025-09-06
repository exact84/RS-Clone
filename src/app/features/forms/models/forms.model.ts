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
