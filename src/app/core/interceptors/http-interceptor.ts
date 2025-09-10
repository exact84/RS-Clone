import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const BACKEND_ENDPOINTS = ['/auth', '/user', '/favourites'];

export const httpInterceptor: HttpInterceptorFn = (request, next) => {
  if (BACKEND_ENDPOINTS.some((endpoint) => request.url.startsWith(endpoint))) {
    return next(
      request.clone({
        url: `${environment.BASE_URL_BACKEND}${request.url}`,
      }),
    );
  }

  const isNetlify = globalThis.location.origin.includes('netlify.app');

  let url: URL;

  if (environment.production && isNetlify) {
    url = new URL('/.netlify/functions/tmdb', globalThis.location.origin);
    url.searchParams.set('path', request.url);
  } else {
    url = new URL(`${environment.BASE_URL}${request.url}`);
    url.searchParams.set('api_key', environment.API_KEY);
  }

  return next(request.clone({ url: url.toString() }));
};
