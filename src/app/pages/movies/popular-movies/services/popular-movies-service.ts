import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ApiErrorService } from '../../../../core/services/api-error-service';
import { Observable, map } from 'rxjs';
import { ContentCard } from '../../../types/content-card';

@Injectable({
  providedIn: 'root',
})
export class PopularMoviesService {
  private http = inject(HttpClient);
  private readonly apiError = inject(ApiErrorService);

  readonly errorSignal = signal<string | null>(null);
  readonly selectedGenre = signal<number | null>(null);

  getMoviesByGenre(genreId: number, page: number): Observable<ContentCard[]> {
    const url = '/discover/movie';
    const parameters = new HttpParams()
      .set('sort_by', 'popularity.desc')
      .set('language', 'en-US')
      .set('page', page.toString())
      .set('with_genres', genreId);

    return this.http.get<{ results: ContentCard[] }>(url, { params: parameters }).pipe(
      map((response) =>
        response.results.map(
          (item) =>
            ({
              ...item,
              media_type: 'movie',
            }) as ContentCard,
        ),
      ),
      this.apiError.handleApiError(this.errorSignal, 'Failed to load movies by genre'),
    );
  }
}
