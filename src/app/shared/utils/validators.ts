import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { PASSWORD_MIN_LENGTH, REQUEST_DELAY_MS } from '../constants/constants';
import { EMPTY, map, Observable, of, switchMap, timer } from 'rxjs';

export function isMatchPasswords(firstFieldName: string, secondFieldName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(firstFieldName);
    const confirmPassword = control.get(secondFieldName);

    return password && confirmPassword && password.value === confirmPassword.value
      ? null
      : { isMatchPasswords: { message: 'Passwords should match' } };
  };
}

export const isPasswordToShort: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  return control.value.length < PASSWORD_MIN_LENGTH
    ? { isPasswordToShort: { message: `at least ${PASSWORD_MIN_LENGTH} characters` } }
    : null;
};

export const hasDigit: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return /\d/g.test(control.value) ? null : { hasDigit: { message: 'at least 1 digit' } };
};

export const hasLetter: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return /[a-zA-Zа-яА-Я]/g.test(control.value)
    ? null
    : { hasLetter: { message: 'at least one letter' } };
};

export const isTakenLogin: AsyncValidatorFn = (
  control: AbstractControl,
): Observable<ValidationErrors | null> => {
  return timer(REQUEST_DELAY_MS).pipe(
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

export const generateFieldValidationErrors = (field: FormControl<string>, message: string) => {
  const { errors } = field;
  if (!errors) return '';
  const passwordRequirements = Object.entries(errors)
    .map((error) => error[1].message)
    .filter(Boolean)
    .join(', ');
  return `${message} ${passwordRequirements}.`;
};
