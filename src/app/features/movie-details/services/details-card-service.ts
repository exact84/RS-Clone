import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MediaType } from '../types/media-type';
import { MediaDetailsMapWithTrailer } from '../../../pages/models/media-details-map-with-trailer.interface';
import { ApiErrorService } from '../../../core/services/api-error-service';

@Injectable({
  providedIn: 'root',
})
export class DetailsCardService {
  http = inject(HttpClient);
  private readonly apiError = inject(ApiErrorService);
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
        this.apiError.handleApiError(this.errorSignal, 'Failed to load card'),
      );
  }
}
