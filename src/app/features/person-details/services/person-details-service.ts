import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ApiErrorService } from '../../../core/services/api-error-service';
import { Observable } from 'rxjs';
import { PersonDetailsItem } from '../../../pages/models/people/person-details.interface';

@Injectable({
  providedIn: 'root',
})
export class PersonDetailsService {
  http = inject(HttpClient);
  private readonly apiError = inject(ApiErrorService);
  readonly errorSignal = signal<string | null>(null);

  getPersonDetails(id: number): Observable<PersonDetailsItem> {
    return this.http
      .get<PersonDetailsItem>(`/person/${id}?language=en-US`)
      .pipe(this.apiError.handleApiError(this.errorSignal, 'Failed to load person details'));
  }
}
