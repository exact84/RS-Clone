import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { MovieCard } from '../../../models/movie-card';
import { ContentCard } from '../../../types/content-card';

@Injectable({
  providedIn: 'root',
})
export class TrendingService {
  http = inject(HttpClient);

  getTrending(mediaType: string, timeWindow: string): Observable<ContentCard[]> {
    const url = `/trending/${mediaType}/${timeWindow}`;
    return this.http.get<{ results: MovieCard[] }>(url).pipe(
      map((response) => response.results),
      catchError(() => of([])),
    );
  }
}
