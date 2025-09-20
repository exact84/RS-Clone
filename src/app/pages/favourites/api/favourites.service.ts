import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FavouritesInterface } from '../models/favourites';
import { MediaType } from '../../../features/movie-details/types/media-type';
import { ContentCard } from '../../types/content-card';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private readonly http = inject(HttpClient);

  getContent(id: number, type: MediaType) {
    return this.http
      .get<ContentCard>(`/${type}/${id}?language=en-US`)
      .pipe(map((card) => ({ ...card, media_type: type }) as ContentCard));
  }

  getLabels() {
    return this.http.get<Omit<FavouritesInterface, 'ids' | 'userId'>[]>('/favourites/labels', {
      observe: 'response',
    });
  }

  getAllFavourite() {
    return this.http.get<FavouritesInterface[]>('/favourites', { observe: 'response' });
  }

  getFavouriteById(id: string) {
    return this.http.get<FavouritesInterface>(`/favourites/${id}`, { observe: 'response' });
  }

  createNewList(label: string) {
    return this.http.post<FavouritesInterface>(
      '/favourites/new',
      { label },
      { observe: 'response' },
    );
  }

  addToFavourites(contentId: string, id: string) {
    return this.http.patch<FavouritesInterface>(
      '/favourites/add',
      { id, contentId },
      { observe: 'response' },
    );
  }

  deleteFromFavourites(contentId: string, id: string) {
    return this.http.patch<FavouritesInterface>(
      '/favourites/delete',
      { id, contentId },
      { observe: 'response' },
    );
  }
}
