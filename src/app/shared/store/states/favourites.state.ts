import {
  ExtendedFavourites,
  FavouritesInterface,
} from '../../../pages/favourites/models/favourites';
import { signalStore, withComputed, withState } from '@ngrx/signals';
import { Events, on, withEffects, withReducer } from '@ngrx/signals/events';
import { computed, inject } from '@angular/core';
import { FavouritesService } from '../../../pages/favourites/api/favourites.service';
import { favouritesEvents } from '../events/favourites.events';
import { EMPTY, from, map, mergeMap, scan, switchMap } from 'rxjs';
import { mapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MediaType } from '../../../features/movie-details/types/media-type';
import { ContentCard } from '../../../pages/types/content-card';
import { profileEvents } from '../events/profile.events';

interface FavouritesState {
  favourites: Record<string, ExtendedFavourites>;
  isLoading: boolean;
}

const initialState: FavouritesState = {
  favourites: {},
  isLoading: false,
};

export const FavouritesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ favourites }) => ({
    favouritesLists: computed(() => Object.values(favourites())),
    hasFavourites: computed(() => Object.values(favourites()).some((list) => list.ids.length)),
  })),
  withReducer(
    on(favouritesEvents.loadFavourites, () => ({ isLoading: true })),
    on(
      favouritesEvents.loadFavouritesSuccess,
      favouritesEvents.loadFavouritesSuccessWithItems,
      ({ payload: favourites }) => {
        const normalizedFavourites: Record<string, FavouritesInterface> = {};
        for (const list of favourites) normalizedFavourites[list.id] = list;
        return { favourites: normalizedFavourites };
      },
    ),
    on(favouritesEvents.loadListItemSuccess, ({ payload: { id, data } }, state) => {
      return {
        favourites: { ...state.favourites, [id]: { ...state.favourites[id], items: [...data] } },
        isLoading: false,
      };
    }),
    on(favouritesEvents.createNewListSuccess, ({ payload: newList }, state) => {
      return {
        favourites: {
          ...state.favourites,
          [newList.id]: newList,
        },
      };
    }),
    on(favouritesEvents.addToFavouritesSuccess, ({ payload: { id, data } }, state) => {
      return {
        favourites: {
          ...state.favourites,
          [id]: {
            ...state.favourites[id],
            ids: [...state.favourites[id].ids, `${data.media_type}/${data.id}`],
            items: state.favourites[id].items ? [...state.favourites[id].items, data] : [data],
          },
        },
      };
    }),
    on(favouritesEvents.deleteFromFavouritesSuccess, ({ payload: { id, contentId } }, state) => {
      return {
        favourites: {
          ...state.favourites,
          [id]: {
            ...state.favourites[id],
            ids: state.favourites[id].ids.filter((id) => id !== contentId),
            items: state.favourites[id].items!.filter((item) => {
              const [type, id] = contentId.split('/');
              return item.media_type === type && item.id !== Number(id);
            }),
          },
        },
      };
    }),
    on(profileEvents.logout, () => initialState),
  ),
  withEffects((store, events = inject(Events), favouritesService = inject(FavouritesService)) => ({
    loadFavourites$: events.on(favouritesEvents.loadFavourites).pipe(
      switchMap(({ payload: { withItems } }) => {
        return store.favouritesLists().length === 0
          ? favouritesService.getAllFavourite().pipe(
              mapResponse({
                next: (response) =>
                  withItems
                    ? favouritesEvents.loadFavouritesSuccessWithItems(response.body!)
                    : favouritesEvents.loadFavouritesSuccess(response.body!),
                error: (error) =>
                  favouritesEvents.loadFavouritesError(
                    error instanceof HttpErrorResponse
                      ? error.error.message
                      : 'Failed to fetch user data',
                  ),
              }),
            )
          : EMPTY;
      }),
    ),
    loadListsItems$: events
      .on(favouritesEvents.loadFavouritesSuccessWithItems, favouritesEvents.loadListItem)
      .pipe(
        map(() => store.favouritesLists()),
        switchMap((favourites) =>
          from(favourites).pipe(
            mergeMap((favourite) =>
              from(favourite.ids).pipe(
                mergeMap((id) => {
                  const [type, itemId] = id.split('/');
                  return favouritesService.getContent(Number(itemId), type as MediaType);
                }),
                scan((accumulator, value) => [...accumulator, value], [] as ContentCard[]),
                mapResponse({
                  next: (data) => favouritesEvents.loadListItemSuccess({ id: favourite.id, data }),
                  error: (error) => {
                    console.log(
                      error instanceof HttpErrorResponse ? error.message : 'Unknown error',
                    );
                  },
                }),
              ),
            ),
          ),
        ),
      ),
    createNewList$: events.on(favouritesEvents.createNewList).pipe(
      switchMap(({ payload: label }) =>
        favouritesService.createNewList(label).pipe(
          mapResponse({
            next: (response) => favouritesEvents.createNewListSuccess(response.body!),
            error: (error) => {
              console.log(error instanceof HttpErrorResponse ? error.message : 'Unknown error');
            },
          }),
        ),
      ),
    ),
    addToFavourite$: events.on(favouritesEvents.addToFavourites).pipe(
      switchMap(({ payload: { id, data } }) => {
        const contentId = `${data.media_type}/${data.id}`;
        return favouritesService.addToFavourites(id, contentId).pipe(
          mapResponse({
            next: () => {
              return favouritesEvents.addToFavouritesSuccess({ id, data });
            },
            error: (error) => {
              console.log(error instanceof HttpErrorResponse ? error.message : 'Unknown error');
            },
          }),
        );
      }),
    ),
    deleteFromFavourites$: events.on(favouritesEvents.deleteFromFavourites).pipe(
      switchMap(({ payload: { id, contentId } }) =>
        favouritesService.deleteFromFavourites(id, contentId).pipe(
          mapResponse({
            next: () => {
              return favouritesEvents.deleteFromFavouritesSuccess({ id, contentId });
            },
            error: (error) => {
              console.log(error instanceof HttpErrorResponse ? error.message : 'Unknown error');
            },
          }),
        ),
      ),
    ),
  })),
);
