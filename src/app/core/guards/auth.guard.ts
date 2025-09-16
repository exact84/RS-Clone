import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../pages/auth/services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.checkAuth().pipe(
    map((isAuth) => {
      if (state.url.startsWith('/auth') && isAuth) {
        router.navigate(['']);
        return false;
      } else if (state.url.startsWith('/auth') && !isAuth) return true;
      else if (!isAuth) {
        authService.logout();
      }
      return isAuth;
    }),
  );
};
