import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
// import { CastPerson } from '../../../pages/models/people/cast-person';
import { ApiErrorService } from '../../../core/services/api-error-service';
import { Person } from '../../../pages/models/people/person.interface';

@Injectable({
  providedIn: 'root',
})
export class TopBilledCastService {
  private readonly http = inject(HttpClient);
  private readonly apiError = inject(ApiErrorService);
  readonly errorSignal = signal<string | null>(null);

  getCast(movieId: number, mediaType: 'movie' | 'tv'): Observable<Person[]> {
    return this.http.get<{ cast: Person[] }>(`/${mediaType}/${movieId}/credits`).pipe(
      map((response) => response.cast),
      this.apiError.handleApiError(this.errorSignal, 'Failed to load cast'),
    );
  }
}
