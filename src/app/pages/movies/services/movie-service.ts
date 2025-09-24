import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieBase } from '../../models/movie-base';

export interface ApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

@Injectable({ providedIn: 'root' })
export class MovieService {
  private readonly http = inject(HttpClient);

  getGenres(): Observable<{ genres: { id: number; name: string }[] }> {
    return this.http.get<{ genres: { id: number; name: string }[] }>('/genre/movie/list', {
      params: new HttpParams().set('language', 'en-US'),
    });
  }

  getKeywords(query: string): Observable<{ results: { id: number; name: string }[] }> {
    return this.http.get<{ results: { id: number; name: string }[] }>('/search/keyword', {
      params: new HttpParams().set('query', query).set('language', 'en-US'),
    });
  }

  getLanguages(): Observable<{ iso_639_1: string; english_name: string; name: string }[]> {
    return this.http.get<{ iso_639_1: string; english_name: string; name: string }[]>(
      '/configuration/languages',
    );
  }

  getCountries(): Observable<{ iso_3166_1: string; english_name: string }[]> {
    return this.http.get<{ iso_3166_1: string; english_name: string }[]>(
      `/configuration/countries`,
    );
  }

  getMoviesByKeywordAndFilters(
    keywordIds: number[],
    filters: Record<string, string>,
    page = 1,
  ): Observable<ApiResponse<MovieBase>> {
    const base = {
      page: String(page),
      language: 'en-US',
      ...(keywordIds.length > 0 ? { with_keywords: keywordIds.join('|') } : {}),
      ...filters,
    };
    const parameters = new HttpParams({ fromObject: base });
    return this.http.get<ApiResponse<MovieBase>>('/discover/movie', { params: parameters });
  }

  getFilteredMovies(filters: Record<string, string>, page = 1): Observable<ApiResponse<MovieBase>> {
    const base = { page: String(page), language: 'en-US', ...filters };
    const parameters = new HttpParams({ fromObject: base });
    return this.http.get<ApiResponse<MovieBase>>(`/discover/movie`, { params: parameters });
  }

  getSearchedMovies(query: string, page: number): Observable<ApiResponse<MovieBase>> {
    const parameters = new HttpParams({
      fromObject: {
        query,
        page: String(page),
        language: 'en-US',
      },
    });
    return this.http.get<ApiResponse<MovieBase>>('/search/movie', {
      params: parameters,
    });
  }
}
