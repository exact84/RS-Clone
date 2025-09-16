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

  getRecommendations(movieId: number): Observable<MovieCard[]> {
    return this.http.get<{ results: MovieCard[] }>(`/movie/${movieId}/recommendations`).pipe(
      map((response) => response.results),
      this.apiError.handleApiError(this.errorSignal, 'Failed to load recommendations'),
    );
  }
}
