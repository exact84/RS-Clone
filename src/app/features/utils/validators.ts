import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PASSWORD_MIN_LENGTH } from '../../shared/constants/constants';
import { EMPTY, map, Observable, of, switchMap, timer } from 'rxjs';

export const isMatchPasswords: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value === confirmPassword.value
    ? null
    : { isMatchPasswords: { message: 'Passwords should match' } };
};

export const isPasswordToShort: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  return control.value.length <= PASSWORD_MIN_LENGTH
    ? { isPasswordToShort: { message: `at least ${PASSWORD_MIN_LENGTH} characters` } }
    : null;
};

export const hasDigit: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return /\d/g.test(control.value) ? null : { hasDigit: { message: 'at least 1 digit' } };
};

export const hasLowercaseLetter: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  return /[a-zа-я]/g.test(control.value)
    ? null
    : { hasLowercaseLetter: { message: 'at least one lowercase letter' } };
};

export const hasUppercaseLetter: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  return /[A-ZА-Я]/g.test(control.value)
    ? null
    : { hasUppercaseLetter: { message: 'at least one uppercase letter' } };
};

export const isTakenLogin: AsyncValidatorFn = (
  control: AbstractControl,
): Observable<ValidationErrors | null> => {
  return timer(500).pipe(
    switchMap(() =>
      EMPTY.pipe(
        map(() => {
          console.log(control.value);
          return of(null);
        }),
      ),
    ),
  );
};
