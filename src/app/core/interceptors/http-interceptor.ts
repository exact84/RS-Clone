import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

const BACKEND_ENDPOINTS = ['/auth', '/user', '/favourites'];

export const httpInterceptor: HttpInterceptorFn = (request, next) => {
  if (BACKEND_ENDPOINTS.some((endpoint) => request.url.startsWith(endpoint))) {
    return next(
      request.clone({
        url: `${environment.BASE_URL_BACKEND}${request.url}`,
      }),
    );
  } else {
    const url = new URL(`${environment.BASE_URL}${request.url}`);
    url.searchParams.set('api_key', environment.API_KEY);
    return next(request.clone({ url: url.toString() }));
  }
};
