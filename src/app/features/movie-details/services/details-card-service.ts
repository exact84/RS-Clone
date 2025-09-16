import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { MediaType } from '../types/media-type';
import { MediaDetailsMapWithTrailer } from '../../../pages/models/media-details-map-with-trailer.interface';

@Injectable({
  providedIn: 'root',
})
export class DetailsCardService {
  http = inject(HttpClient);
  readonly errorSignal = signal<string | null>(null);

  getMovieDetails<T extends MediaType>(
    id: number,
    type: T,
  ): Observable<MediaDetailsMapWithTrailer[T]> {
    return this.http
      .get<MediaDetailsMapWithTrailer[T]>(`/${type}/${id}?language=en-US&append_to_response=videos`)
      .pipe(
        map((response) => {
          const trailer = response.videos?.results?.find(
            (video) => video.type === 'Trailer' && video.site === 'YouTube',
          );

          return {
            ...response,
            media_type: type,
            trailerKey: trailer?.key ?? null,
          };
        }),
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
