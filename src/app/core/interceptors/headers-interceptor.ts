import { HttpInterceptorFn } from '@angular/common/http';
import { AUTHORIZATION_KEY } from '../../shared/constants/constants';

const BACKEND_ENDPOINTS = ['/auth', '/user', '/favourites'];

const PUBLIC_ENDPOINTS = ['/auth', '/user/check'];

export const headersInterceptor: HttpInterceptorFn = (request, next) => {
  if (BACKEND_ENDPOINTS.some((endpoint) => request.url.startsWith(endpoint))) {
    if (PUBLIC_ENDPOINTS.some((endpoint) => request.url.startsWith(endpoint))) {
      return next(request);
    } else {
      const token = localStorage.getItem(AUTHORIZATION_KEY);
      return token
        ? next(
            request.clone({
              headers: request.headers.set('authorization', `Bearer ${token}`),
            }),
          )
        : next(request);
    }
  } else return next(request);
};
