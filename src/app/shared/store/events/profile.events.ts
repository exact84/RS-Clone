import { eventGroup } from '@ngrx/signals/events';
import { type } from '@ngrx/signals';
import { User } from '../../../pages/auth/models/signup';

export const profileEvents = eventGroup({
  source: 'Profile',
  events: {
    loadProfile: type<void>(),
    loadProfileSuccess: type<User>(),
    loadProfileError: type<string>(),
    logout: type<void>(),
  },
});
