import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MovieCard } from '../../../pages/models/movie-card';
import { ApiErrorService } from '../../../core/services/api-error-service';

@Injectable({
  providedIn: 'root',
})
export class RecommendationsService {
  http = inject(HttpClient);
  private readonly apiError = inject(ApiErrorService);
  readonly errorSignal = signal<string | null>(null);

  getRecommendations(movieId: number, mediaType: 'movie' | 'tv'): Observable<MovieCard[]> {
    return this.http.get<{ results: MovieCard[] }>(`/${mediaType}/${movieId}/recommendations`).pipe(
      map((response) =>
        response.results
          .filter(
            (item) => item.poster_path && (item.media_type === 'movie' || item.media_type === 'tv'),
          )
          .map((item) => ({
            ...item,
            media_type: item.media_type as 'movie' | 'tv',
          })),
      ),
      this.apiError.handleApiError(this.errorSignal, 'Failed to load recommendations'),
    );
  }
}
