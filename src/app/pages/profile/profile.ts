import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { UpdatePasswordForm } from '../../features/forms/update-password-form/update-password-form';
import { ProfileStore } from '../../shared/store/states/profile.state';
import { Dispatcher } from '@ngrx/signals/events';
import { profileEvents } from '../../shared/store/events/profile.events';

@Component({
  selector: 'app-profile',
  imports: [UpdatePasswordForm, ReactiveFormsModule],
  providers: [ProfileStore],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile {
  private readonly profileStore = inject(ProfileStore);
  private readonly dispatcher = inject(Dispatcher);

  user = this.profileStore.user;

  userInitials = this.profileStore.userInitials;
  favouritesInfo = this.profileStore.summaryInfo;

  constructor() {
    this.dispatcher.dispatch(profileEvents.loadProfile());
  }
}
