import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const isMatchPasswords: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value === confirmPassword.value
    ? null
    : { isMatchPasswords: { message: 'Passwords should match' } };
};
