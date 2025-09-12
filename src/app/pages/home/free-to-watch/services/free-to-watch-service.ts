import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { ContentCard } from '../../../types/content-card';

@Injectable({
  providedIn: 'root',
})
export class FreeToWatchService {
  http = inject(HttpClient);

  getFreeToWatchByCategory(category: string): Observable<ContentCard[]> {
    let url = '';
    let parameters = new HttpParams();

    switch (category) {
      case 'movies': {
        url = '/discover/movie';
        parameters = parameters.set('with_watch_monetization_types', 'free');
        break;
      }

      case 'tv': {
        url = '/discover/tv';
        parameters = parameters
          .set('with_watch_monetization_types', 'free')
          .set('with_watch_providers', '9')
          .set('watch_region', 'US');
        break;
      }

      default: {
        url = '/movie/top_rated';
      }
    }

    return this.http.get<{ results: ContentCard[] }>(url, { params: parameters }).pipe(
      map((response) => response.results),
      catchError((error) => {
        console.error('FreeToWatchService error:', error);
        return throwError(() => error);
      }),
    );
  }
}
