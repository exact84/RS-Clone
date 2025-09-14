import { FormControl } from '@angular/forms';

export interface UpdatePassword {
  oldPassword: string;
  newPassword: string;
}

export interface UpdatePasswordForm {
  oldPassword: FormControl<string>;
  newPassword: FormControl<string>;
  confirmNewPassword: FormControl<string>;
}
