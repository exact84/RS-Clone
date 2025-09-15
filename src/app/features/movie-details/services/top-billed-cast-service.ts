import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CastPerson } from '../../../pages/models/people/cast-person';

@Injectable({
  providedIn: 'root',
})
export class TopBilledCastService {
  private readonly http = inject(HttpClient);

  getCast(movieId: number): Observable<CastPerson[]> {
    return this.http
      .get<{ cast: CastPerson[] }>(`/movie/${movieId}/credits`)
      .pipe(map((response) => response.cast));
  }
}
