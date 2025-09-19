import {
  ExtendedFavourites,
  FavouritesInterface,
} from '../../../pages/favourites/models/favourites';
import { signalStore, withComputed, withState } from '@ngrx/signals';
import { Events, on, withEffects, withReducer } from '@ngrx/signals/events';
import { computed, inject } from '@angular/core';
import { FavouritesService } from '../../../pages/favourites/api/favourites.service';
import { favouritesEvents } from '../events/favourites.events';
import { from, mergeMap, scan, switchMap } from 'rxjs';
import { mapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { DetailsCardService } from '../../../features/movie-details/services/details-card-service';
import { MovieDetailsWithTrailer } from '../../../pages/models/movie-details-with-trailer.interface';
import { TVDetailsWithTrailer } from '../../../pages/models/tv-details-with-trailer.interface';
import { MediaType } from '../../../features/movie-details/types/media-type';

interface FavouritesState {
  favourites: Record<string, ExtendedFavourites>;
  isLoading: boolean;
}

const initialState: FavouritesState = {
  favourites: {},
  isLoading: false,
};

export const FavouritesStore = signalStore(
  withState(initialState),
  withComputed(({ favourites }) => ({
    favouritesArray: computed(() => Object.values(favourites())),
    listLabels: computed(() => Object.values(favourites()).map(({ label, id }) => ({ label, id }))),
  })),
  withReducer(
    on(favouritesEvents.loadFavourites, () => ({ isLoading: true })),
    on(favouritesEvents.loadFavouritesSuccess, ({ payload: favourites }) => {
      const normalizedFavourites: Record<string, FavouritesInterface> = {};
      for (const list of favourites) normalizedFavourites[list.id] = list;
      return { favourites: normalizedFavourites };
    }),
    on(favouritesEvents.loadListItemSuccess, (event, state) => {
      const copyFavourites = { ...state.favourites };
      const { id, data } = event.payload;
      copyFavourites[id].items = [...data];
      return { favourites: copyFavourites, isLoading: false };
    }),
    on(favouritesEvents.createNewListSuccess, ({ payload: newList }, state) => {
      const copyFavourites = { ...state.favourites };
      copyFavourites[newList.id] = newList;
      return { favourites: copyFavourites };
    }),
    on(favouritesEvents.addToFavouritesSuccess, ({ payload: { id, data } }, state) => {
      const copyFavourites = { ...state.favourites };
      copyFavourites[id].ids = [...copyFavourites[id].ids, `${data.media_type}/${data.id}`];
      copyFavourites[id].items = copyFavourites[id].items
        ? [...copyFavourites[id].items, data]
        : [data];
      return { favourites: copyFavourites };
    }),
    on(favouritesEvents.deleteFromFavouritesSuccess, ({ payload: { id, contentId } }, state) => {
      const copyFavourites = { ...state.favourites };
      const idsIndex = copyFavourites[id].ids.indexOf(contentId);
      copyFavourites[id].ids =
        idsIndex === -1 ? copyFavourites[id].ids : copyFavourites[id].ids.splice(idsIndex, 1);
      const itemIndex = copyFavourites[id].items!.findIndex((item) => {
        const [type, itemId] = contentId.split('/');
        return item.id === Number(itemId) && item.media_type === type;
      });
      copyFavourites[id].items =
        itemIndex === -1
          ? copyFavourites[id].items
          : copyFavourites[id].items!.splice(itemIndex, 1);
      return { favourites: copyFavourites };
    }),
  ),
  withEffects(
    (
      store,
      events = inject(Events),
      favouritesService = inject(FavouritesService),
      detailsCardService = inject(DetailsCardService),
    ) => ({
      loadFavourites$: events.on(favouritesEvents.loadFavourites).pipe(
        switchMap(() =>
          favouritesService.getAllFavourite().pipe(
            mapResponse({
              next: (response) => favouritesEvents.loadFavouritesSuccess(response.body!),
              error: (error) =>
                favouritesEvents.loadFavouritesError(
                  error instanceof HttpErrorResponse
                    ? error.error.message
                    : 'Failed to fetch user data',
                ),
            }),
          ),
        ),
      ),
      loadListsItems$: events.on(favouritesEvents.loadFavouritesSuccess).pipe(
        switchMap(({ payload: favourites }) =>
          from(favourites).pipe(
            mergeMap((favourite) =>
              from(favourite.ids).pipe(
                mergeMap((id) => {
                  const [type, itemId] = id.split('/');
                  return detailsCardService.getMovieDetails(Number(itemId), type as MediaType);
                }),
                scan(
                  (accumulator, value) => [...accumulator, value],
                  [] as (MovieDetailsWithTrailer | TVDetailsWithTrailer)[],
                ),
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
          return favouritesService.addToFavourites(contentId, id).pipe(
            mapResponse({
              next: (response) => {
                if (response.ok) favouritesEvents.addToFavouritesSuccess({ id, data });
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
          favouritesService.deleteFromFavourites(contentId, id).pipe(
            mapResponse({
              next: (response) => {
                if (response.ok) favouritesEvents.deleteFromFavouritesSuccess({ id, contentId });
              },
              error: (error) => {
                console.log(error instanceof HttpErrorResponse ? error.message : 'Unknown error');
              },
            }),
          ),
        ),
      ),
    }),
  ),
);
