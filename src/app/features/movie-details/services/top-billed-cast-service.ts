import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CastPerson } from '../../../pages/models/people/cast-person';

@Injectable({
  providedIn: 'root',
})
export class TopBilledCastService {
  private readonly http = inject(HttpClient);

  getCast(movieId: number): Observable<CastPerson[]> {
    return this.http.get<{ cast: CastPerson[] }>(`/movie/${movieId}/credits`).pipe(
      map((response) => response.cast),
      catchError((error) => {
        const status = error.status ?? 0;
        const message =
          status === 401
            ? 'Authorization error: missing or invalid key'
            : `Error ${error.status}: ${error.message}`;

        console.error('TopBilledCastService error:', message);

        return throwError(() => error);
      }),
    );
  }
}
