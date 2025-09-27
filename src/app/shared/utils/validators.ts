import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { PASSWORD_MIN_LENGTH, REQUEST_DELAY_MS } from '../constants/constants';
import { map, Observable, switchMap, timer } from 'rxjs';
import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FavouritesStore } from '../store/states/favourites.state';

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

export function isTakenLogin(): AsyncValidatorFn {
  const http = inject(HttpClient);
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return timer(REQUEST_DELAY_MS).pipe(
      switchMap(() =>
        http.post<{ isTaken: boolean }>('/user/check', { login: control.value }).pipe(
          map(({ isTaken }) => {
            return isTaken ? { isTakenLogin: { message: 'This login is exist' } } : null;
          }),
        ),
      ),
    );
  };
}

export function isTakenListName(): ValidatorFn {
  const favouritesStore = inject(FavouritesStore);
  const lists = favouritesStore.favouritesLists;
  const labels = computed(() => lists().map(({ label }) => label));
  return (control: AbstractControl): ValidationErrors | null => {
    return labels().includes(control.value)
      ? { isTakenListName: { message: `List with name ${control.value} is exist` } }
      : null;
  };
}

export const generateFieldValidationErrors = (field: FormControl<string>, message: string) => {
  const { errors } = field;
  if (!errors) return '';
  const passwordRequirements = Object.entries(errors)
    .map((error) => error[1].message)
    .filter(Boolean)
    .join(', ');
  return `${message} ${passwordRequirements}.`;
};
