import { TestBed } from '@angular/core/testing';

import { FavouritesMenuService } from './favourites-menu.service';
import { Dispatcher } from '@ngrx/signals/events';
import { FavouritesStore } from '../../../shared/store/states/favourites.state';
import { mockFavouritesStore } from '../../../shared/testing/mock-store/favourites.mock';
import { favouritesEvents } from '../../../shared/store/events/favourites.events';
import { mockMovieCards } from '../../../shared/testing/mocks/movie-card.mock';

describe('FavouritesMenuService', () => {
  let service: FavouritesMenuService;
  let dispatcherSpy: jasmine.SpyObj<Dispatcher>;

  beforeEach(() => {
    dispatcherSpy = jasmine.createSpyObj('Dispatcher', ['dispatch']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Dispatcher, useValue: dispatcherSpy },
        { provide: FavouritesStore, useValue: mockFavouritesStore },
      ],
    });
    service = TestBed.inject(FavouritesMenuService);
  });

  it('should dispatch loadFavourites on init if list is empty', () => {
    expect(dispatcherSpy.dispatch).toHaveBeenCalledWith(
      favouritesEvents.loadFavourites({ withItems: false }),
    );
  });

  it('should dispatch addToFavourites with first movie card', () => {
    const card = mockMovieCards[0];

    service.addToFavourites('list-1', card);

    expect(dispatcherSpy.dispatch).toHaveBeenCalledWith(
      favouritesEvents.addToFavourites({ id: 'list-1', data: card }),
    );
  });

  it('should dispatch deleteFromFavourites', () => {
    const listId = 'list-1';
    const contentId = 'movie/1';

    service.deleteFromFavourites(listId, contentId);

    expect(dispatcherSpy.dispatch).toHaveBeenCalledWith(
      favouritesEvents.deleteFromFavourites({ id: listId, contentId }),
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
