import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { MovieWithTrailer } from '../../../models/movie-with-trailer';
import { MovieCard } from '../../../models/movie-card';
import { TVCard } from '../../../models/tv-card';
import { TVWithTrailer } from '../../../models/tv-with-trailer';
import { TrailerResponse } from '../../../models/trailer-response';

@Injectable({
  providedIn: 'root',
})
export class MoviesTrailersService {
  http = inject(HttpClient);

  getDateRange = (monthsAgo: number): { from: string; to: string } => {
    const today = new Date();
    const past = new Date(today);

    past.setMonth(today.getMonth() - monthsAgo);

    if (past > today) {
      past.setFullYear(today.getFullYear() - 1);
    }

    const to = today.toISOString().split('T')[0];
    const from = past.toISOString().split('T')[0];

    return { from, to };
  };

  private getMovieTrailer(id: number): Observable<string | null> {
    const url = `/movie/${id}/videos`;

    return this.http.get<TrailerResponse>(url).pipe(
      map((response) => {
        const trailer = response.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube',
        );
        return trailer?.key || null;
      }),
    );
  }

  private getTVTrailer(id: number): Observable<string | null> {
    const url = `/tv/${id}/videos`;

    return this.http.get<TrailerResponse>(url).pipe(
      map((response) => {
        const trailer = response.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube',
        );
        return trailer?.key || null;
      }),
    );
  }

  getPopularTrailers(): Observable<MovieWithTrailer[]> {
    const { from, to } = this.getDateRange(6);
    const parameters = new HttpParams()
      .set('sort_by', 'popularity.desc')
      .set('primary_release_date.gte', from)
      .set('primary_release_date.lte', to);

    const url = `/discover/movie`;

    return this.http.get<{ results: MovieCard[] }>(url, { params: parameters }).pipe(
      switchMap((response) => {
        const requests = response.results.map((movie) =>
          this.getMovieTrailer(movie.id).pipe(map((trailerKey) => ({ ...movie, trailerKey }))),
        );
        return forkJoin(requests);
      }),
      map((movies) => movies.filter((m) => m.trailerKey)),
    );
  }

  getStreamingTrailers(): Observable<MovieWithTrailer[]> {
    const { from, to } = this.getDateRange(3);
    const parameters = new HttpParams()
      .set('with_watch_providers', '8')
      .set('watch_region', 'US')
      .set('with_watch_monetization_types', 'flatrate')
      .set('primary_release_date.gte', from)
      .set('primary_release_date.lte', to);

    const url = `/discover/movie`;

    return this.http.get<{ results: MovieCard[] }>(url, { params: parameters }).pipe(
      switchMap((response) => {
        const requests = response.results.map((movie) =>
          this.getMovieTrailer(movie.id).pipe(map((trailerKey) => ({ ...movie, trailerKey }))),
        );
        return forkJoin(requests);
      }),
      map((movies) => movies.filter((m) => m.trailerKey)),
    );
  }

  getTVTrailers(): Observable<TVWithTrailer[]> {
    const { from, to } = this.getDateRange(3);
    const parameters = new HttpParams()
      .set('sort_by', 'popularity.desc')
      .set('with_original_language', 'en')
      .set('vote_count.gte', '50')
      .set('first_air_date.gte', from)
      .set('first_air_date.lte', to);

    const url = `/discover/tv`;

    return this.http.get<{ results: TVCard[] }>(url, { params: parameters }).pipe(
      switchMap((response) => {
        const requests = response.results.map((tv) =>
          this.getTVTrailer(tv.id).pipe(map((trailerKey) => ({ ...tv, trailerKey }))),
        );
        return forkJoin(requests);
      }),
      map((tvShows) => tvShows.filter((tv) => tv.trailerKey)),
    );
  }

  getForRentTrailers(): Observable<MovieWithTrailer[]> {
    const { from, to } = this.getDateRange(3);
    const parameters = new HttpParams()
      .set('with_watch_monetization_types', 'rent')
      .set('watch_region', 'US')
      .set('sort_by', 'primary_release_date.desc')
      .set('primary_release_date.gte', from)
      .set('primary_release_date.lte', to);

    const url = `/discover/movie`;

    return this.http.get<{ results: MovieCard[] }>(url, { params: parameters }).pipe(
      switchMap((response) => {
        const requests = response.results.map((movie) =>
          this.getMovieTrailer(movie.id).pipe(map((trailerKey) => ({ ...movie, trailerKey }))),
        );
        return forkJoin(requests);
      }),
      map((movies) => movies.filter((m) => m.trailerKey)),
    );
  }
}
