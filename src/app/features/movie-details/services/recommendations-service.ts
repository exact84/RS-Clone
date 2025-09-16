import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { MovieCard } from '../../../pages/models/movie-card';

@Injectable({
  providedIn: 'root',
})
export class RecommendationsService {
  http = inject(HttpClient);

  getRecommendations(movieId: number): Observable<MovieCard[]> {
    return this.http.get<{ results: MovieCard[] }>(`/movie/${movieId}/recommendations`).pipe(
      map((response) => response.results),
      catchError((error) => {
        const status = error.status ?? 0;
        const message =
          status === 401
            ? 'Authorization error: missing or invalid key'
            : `Error ${error.status}: ${error.message}`;

        console.error('RecommendationsService error:', message);

        return throwError(() => error);
      }),
    );
  }
}
