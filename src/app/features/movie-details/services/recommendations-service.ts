import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiErrorService } from '../../../core/services/api-error-service';
import { ContentCard } from '../../../pages/types/content-card';

@Injectable({
  providedIn: 'root',
})
export class RecommendationsService {
  http = inject(HttpClient);
  private readonly apiError = inject(ApiErrorService);
  readonly errorSignal = signal<string | null>(null);

  getRecommendations(movieId: number, mediaType: 'movie' | 'tv'): Observable<ContentCard[]> {
    return this.http
      .get<{ results: ContentCard[] }>(`/${mediaType}/${movieId}/recommendations`)
      .pipe(
        map((response) =>
          response.results
            .filter(
              (item) =>
                item.poster_path && (item.media_type === 'movie' || item.media_type === 'tv'),
            )
            .map(
              (item) =>
                ({
                  ...item,
                  media_type: item.media_type as 'movie' | 'tv',
                }) as ContentCard,
            ),
        ),
        this.apiError.handleApiError(this.errorSignal, 'Failed to load recommendations'),
      );
  }
}
