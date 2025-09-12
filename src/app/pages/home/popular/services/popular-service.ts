import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { ContentCard } from '../../../types/content-card';
import { getDateRange } from '../../../../shared/utils/date-range';

@Injectable({
  providedIn: 'root',
})
export class PopularService {
  private http = inject(HttpClient);

  getPopularByCategory(category: string): Observable<ContentCard[]> {
    const { from, to } = getDateRange(3);
    let url = '/discover/movie';
    let parameters = new HttpParams()
      .set('sort_by', 'popularity.desc')
      .set('primary_release_date.gte', from)
      .set('primary_release_date.lte', to);

    switch (category) {
      case 'streaming': {
        parameters = parameters.set('with_watch_providers', '8').set('watch_region', 'US');
        break;
      }
      case 'on-tv': {
        url = '/discover/tv';
        parameters = parameters.set('with_watch_providers', '9').set('watch_region', 'US');
        break;
      }
      case 'for-rent': {
        parameters = parameters.set('with_release_type', '3');
        break;
      }
    }

    return this.http.get<{ results: ContentCard[] }>(url, { params: parameters }).pipe(
      map((response) => response.results),
      catchError((error) => {
        console.error('PopularMoviesService error:', error);
        return throwError(() => error);
      }),
    );
  }
}
