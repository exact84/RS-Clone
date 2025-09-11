import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequest, User } from '../models/signup';
import { LoginRequest, LoginResponse } from '../models/login';
import { AUTHORIZATION_KEY } from '../../../shared/constants/constants';
import { catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private isAuth = signal(false);

  signup(signup: SignupRequest) {
    return this.http.post<User>('/auth/signup', signup, { observe: 'response' });
  }

  login(login: LoginRequest) {
    return this.http.post<LoginResponse>('/auth/login', login, { observe: 'response' }).pipe(
      tap((response) => {
        if (response.ok) this.isAuth.set(true);
      }),
    );
  }

  saveToken(token: string) {
    localStorage.setItem(AUTHORIZATION_KEY, token);
  }

  checkAuth() {
    return this.http.get('/auth/check', { observe: 'response' }).pipe(
      map((response) => {
        if (response.ok) {
          this.isAuth.set(true);
          return true;
        } else {
          this.logout();
          return false;
        }
      }),
      catchError(() => {
        this.logout();
        return of(false);
      }),
    );
  }

  get authStatus() {
    return this.isAuth.asReadonly();
  }

  logout() {
    this.isAuth.set(false);
    localStorage.removeItem(AUTHORIZATION_KEY);
    this.router.navigate(['']);
  }
}
