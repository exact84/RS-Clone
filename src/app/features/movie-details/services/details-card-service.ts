import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MediaDetailsMap } from '../types/media-details-map';
import { MediaType } from '../types/media-type';

@Injectable({
  providedIn: 'root',
})
export class DetailsCardService {
  http = inject(HttpClient);

  getMovieDetails<T extends MediaType>(id: number, type: T): Observable<MediaDetailsMap[T]> {
    return this.http
      .get<MediaDetailsMap[T]>(`/${type}/${id}?language=en-US`)
      .pipe(map((response) => ({ ...response, media_type: type }) as MediaDetailsMap[T]));
  }
}
