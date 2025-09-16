import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CastPerson } from '../../../pages/models/people/cast-person';
import { ApiErrorService } from '../../../core/services/api-error-service';

@Injectable({
  providedIn: 'root',
})
export class TopBilledCastService {
  private readonly http = inject(HttpClient);
  private readonly apiError = inject(ApiErrorService);
  readonly errorSignal = signal<string | null>(null);

  getCast(movieId: number): Observable<CastPerson[]> {
    return this.http.get<{ cast: CastPerson[] }>(`/movie/${movieId}/credits`).pipe(
      map((response) => response.cast),
      this.apiError.handleApiError(this.errorSignal, 'Failed to load cast'),
    );
  }
}
