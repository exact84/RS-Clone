import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { mapResponse } from '@ngrx/operators';
import { signalStore, withState, withComputed } from '@ngrx/signals';
import { withReducer, on, withEffects, Events } from '@ngrx/signals/events';
import { switchMap } from 'rxjs';
import { User } from '../../../pages/auth/models/signup';
import { ProfileService } from '../../../pages/profile/api/profile.service';
import { profileEvents } from '../events/profile.events';

export interface ProfileState {
  user: User | null;
  isLoading: boolean;
}

const initialState: ProfileState = {
  user: null,
  isLoading: false,
};

export const ProfileStore = signalStore(
  withState(initialState),
  withComputed(({ user }) => ({
    userInitials: computed(() =>
      user() ? `${user()!.firstName[0].toUpperCase()}${user()!.lastName[0].toUpperCase()}` : '',
    ),
    summaryInfo: computed(() =>
      Object.values(user()!.favourites).map(({ label, ids }) => ({ label, count: ids.length })),
    ),
  })),
  withReducer(
    on(profileEvents.loadProfile, () => ({ isLoading: true })),
    on(profileEvents.loadProfileSuccess, ({ payload: user }) => ({ user, isLoading: false })),
    on(profileEvents.logout, () => ({ ...initialState })),
  ),
  withEffects((store, events = inject(Events), profileService = inject(ProfileService)) => ({
    loadProfile$: events.on(profileEvents.loadProfile).pipe(
      switchMap(() =>
        profileService.getUser().pipe(
          mapResponse({
            next: (response) => profileEvents.loadProfileSuccess(response.body!),
            error: (error) =>
              profileEvents.loadProfileError(
                error instanceof HttpErrorResponse
                  ? error.error.message
                  : 'Failed to fetch user data',
              ),
          }),
        ),
      ),
    ),
  })),
);
