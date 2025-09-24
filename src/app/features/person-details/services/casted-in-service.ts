import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ApiErrorService } from '../../../core/services/api-error-service';
import { map, Observable } from 'rxjs';
import { PersonCredits } from '../../../pages/models/people/person-credits.interface';
import { CastedInCard } from '../casted-in-card.interface';

@Injectable({
  providedIn: 'root',
})
export class CastedInService {
  http = inject(HttpClient);
  private readonly apiError = inject(ApiErrorService);
  readonly errorSignal = signal<string | null>(null);

  getCastedIn(id: number): Observable<CastedInCard[]> {
    const url = `/person/${id}/combined_credits`;
    return this.http.get<PersonCredits>(url).pipe(
      map((result) =>
        result.cast
          .filter((item) => item.poster_path)
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 10)
          .map(
            (item): CastedInCard => ({
              id: item.id,
              title: item.title ?? item.name ?? 'Untitled',
              poster_path: item.poster_path ?? '',
              media_type: item.media_type as 'movie' | 'tv',
            }),
          ),
      ),

      this.apiError.handleApiError(this.errorSignal, 'Failed to load casted-in movies'),
    );
  }
}
