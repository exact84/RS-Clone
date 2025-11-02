import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ApiErrorService } from '../../../core/services/api-error-service';
import { map, Observable } from 'rxjs';
import { Genres } from './models/genres.interface';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  private http = inject(HttpClient);
  private readonly apiError = inject(ApiErrorService);

  readonly errorSignal = signal<string | null>(null);

  getGenres(): Observable<Genres[]> {
    return this.http.get<{ genres: Genres[] }>('/genre/movie/list?language=en').pipe(
      map((response) => response.genres),
      this.apiError.handleApiError(this.errorSignal, 'Failed to load genres'),
    );
  }
}
