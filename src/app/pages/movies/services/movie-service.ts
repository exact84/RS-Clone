import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiErrorService } from '../../../core/services/api-error-service';
import { map, Observable } from 'rxjs';
import { ContentCard } from '../../types/content-card';
import { PARAMS_TOKEN } from './parameters-token';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);
  private readonly apiError = inject(ApiErrorService);
  private paramsToken = inject(PARAMS_TOKEN);

  readonly errorSignal = signal<string | null>(null);
  readonly selectedGenre = signal<number | null>(null);
  readonly total_pages = signal(1);

  getMoviesByGenre(genreId: number, page = 1): Observable<ContentCard[]> {
    const url = '/discover/movie';
    const standardParameters = {
      sort_by: 'popularity.desc',
      language: 'en-US',
      page: page,
      with_genres: genreId,
    };
    const parameters = new HttpParams({
      fromObject: Object.assign(standardParameters, this.paramsToken),
    });

    return this.http
      .get<{ results: ContentCard[]; total_pages: number }>(url, { params: parameters })
      .pipe(
        map((response) => {
          this.total_pages.set(response.total_pages);

          return response.results.map(
            (item) =>
              ({
                ...item,
                media_type: 'movie',
              }) as ContentCard,
          );
        }),
        this.apiError.handleApiError(this.errorSignal, 'Failed to load movies by genre'),
      );
  }
}
