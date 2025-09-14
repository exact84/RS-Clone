import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { MediaDetailsMap } from '../types/media-details-map';
import { MediaType } from '../types/media-type';

@Injectable({
  providedIn: 'root',
})
export class DetailsCardService {
  http = inject(HttpClient);
  readonly errorSignal = signal<string | null>(null);

  getMovieDetails<T extends MediaType>(id: number, type: T): Observable<MediaDetailsMap[T]> {
    return this.http.get<MediaDetailsMap[T]>(`/${type}/${id}?language=en-US`).pipe(
      map((response) => ({ ...response, media_type: type }) as MediaDetailsMap[T]),
      catchError((error) => {
        const status = error.status ?? 0;
        const message =
          status === 401
            ? 'Authorization error: missing or invalid key'
            : `Error ${error.status}: ${error.message}`;

        console.error('MovieDetailsService error:', message);
        this.errorSignal.set(message);
        return throwError(() => error);
      }),
    );
  }
}
