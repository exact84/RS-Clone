import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../pages/auth/services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.checkAuth().pipe(
    map((isAuth) => {
      if (segments.toString().startsWith('auth') && isAuth) {
        router.navigate(['']);
        return false;
      } else if (segments.toString().startsWith('auth') && !isAuth) return true;
      else if (!isAuth) {
        authService.logout();
      }
      return isAuth;
    }),
  );
};
