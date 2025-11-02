import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { PeopleResponse } from '../../models/people/people-response.interface';
import { ApiErrorService } from '../../../core/services/api-error-service';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  http = inject(HttpClient);
  private readonly apiError = inject(ApiErrorService);
  readonly errorSignal = signal<string | null>(null);

  getPeople(page = 1): Observable<PeopleResponse> {
    return this.http
      .get<PeopleResponse>(`/person/popular?page=${page}`)
      .pipe(this.apiError.handleApiError(this.errorSignal, 'Failed to load people'));
  }
}
