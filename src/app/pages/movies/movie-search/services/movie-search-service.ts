import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieResponse } from '../../../models/movie-response';

@Injectable({
  providedIn: 'root',
})
export class MovieSearchService {
  private http = inject(HttpClient);

  getSearchedMovies(query: string, page = 1): Observable<MovieResponse> {
    const parameters = new HttpParams({
      fromObject: {
        query,
        page: String(page),
        language: 'en-US',
      },
    });
    return this.http.get<MovieResponse>('/search/movie', {
      params: parameters,
    });
  }
}
