import { TestBed } from '@angular/core/testing';
import { FavouritesStore } from './favourites.state';
import { favouritesEvents } from '../events/favourites.events';
import { mockExtendedFavourites } from '../../testing/mocks/extended-favourites.mock';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Dispatcher } from '@ngrx/signals/events';
import { profileEvents } from '../events/profile.events';
import { FavouritesStoreSelectors } from '../../../pages/models/favourites-store.interface';

describe('FavouritesStore (reducer only)', () => {
  let store: FavouritesStoreSelectors;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), FavouritesStore],
    });

    store = TestBed.inject(FavouritesStore);
  });

  it('should add a new list on createNewListSuccess', () => {
    const newList = mockExtendedFavourites[0];

    const dispatcher = TestBed.inject(Dispatcher);
    dispatcher.dispatch(favouritesEvents.createNewListSuccess(newList));

    expect(store.favouritesLists().length).toBe(1);
    expect(store.favouritesLists()[0].id).toBe('list-1');
  });

  it('should normalize favourites on loadFavouritesSuccess', () => {
    const dispatcher = TestBed.inject(Dispatcher);

    const payload = mockExtendedFavourites.map(({ id, label, ids, userId }) => ({
      id,
      label,
      ids,
      userId,
    }));

    dispatcher.dispatch(favouritesEvents.loadFavouritesSuccess(payload));

    const lists = store.favouritesLists();
    expect(lists.length).toBe(3);
    expect(lists[0].id).toBe('list-1');
    expect(store.hasFavourites()).toBeTrue();
  });

  it('should set errorMessage on loadFavouritesError', () => {
    const dispatcher = TestBed.inject(Dispatcher);
    const error = 'Failed to load favourites';

    dispatcher.dispatch(favouritesEvents.loadFavouritesError(error));

    expect(store.hasFavourites()).toBeFalse();
    expect(store.favouritesLists().length).toBe(0);
    expect(store.error()).toBe(error);
    expect(store.loading()).toBeFalse();
  });

  it('should reset state on logout', () => {
    const dispatcher = TestBed.inject(Dispatcher);

    dispatcher.dispatch(favouritesEvents.createNewListSuccess(mockExtendedFavourites[0]));
    expect(store.favouritesLists().length).toBe(1);

    dispatcher.dispatch(profileEvents.logout());

    expect(store.favouritesLists().length).toBe(0);
    expect(store.hasFavourites()).toBeFalse();
  });
});
