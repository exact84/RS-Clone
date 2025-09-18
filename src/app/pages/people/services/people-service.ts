import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PeopleResponse } from '../../models/people/people-response.interface';
import { ApiErrorService } from '../../../core/services/api-error-service';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  http = inject(HttpClient);
  private readonly apiError = inject(ApiErrorService);
  readonly errorSignal = signal<string | null>(null);

  // getPeople(page: number = 1): Observable<PeopleResponse> {
  //   const start = performance.now();
  //   return this.http.get<PeopleResponse>(`/person/popular?page=${page}`).pipe(
  //     map((response) => response),
  //     this.apiError.handleApiError(this.errorSignal, 'Failed to load people'),
  //   );
  // }
  getPeople(page = 1): Observable<PeopleResponse> {
    const start = performance.now();
    return this.http.get<PeopleResponse>(`/person/popular?page=${page}`).pipe(
      tap(() => {
        const end = performance.now();
        console.log(`🕒 API response time: ${(end - start).toFixed(2)}ms`);
      }),
      this.apiError.handleApiError(this.errorSignal, 'Failed to load people'),
    );
  }
}
