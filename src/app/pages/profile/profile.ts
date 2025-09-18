import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ProfileService } from './api/profile.service';
import { ReactiveFormsModule } from '@angular/forms';

import { User } from '../auth/models/signup';
import { HttpErrorResponse } from '@angular/common/http';
import { UpdatePasswordForm } from '../../features/forms/update-password-form/update-password-form';

@Component({
  selector: 'app-profile',
  imports: [UpdatePasswordForm, ReactiveFormsModule],
  providers: [ProfileService],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile {
  private readonly profileService = inject(ProfileService);

  user = signal<User | null>(null);
  errorMessage = signal('');

  userInitials = computed(() => {
    return `${this.user()?.firstName[0]}${this.user()?.lastName[0]}`;
  });

  constructor() {
    effect(() => {
      this.profileService.getUser().subscribe({
        next: (response) => {
          this.user.set(response.body);
        },
        error: (error) => {
          this.errorMessage.set(
            error instanceof HttpErrorResponse ? error.error.message : 'Failed to fetch user data',
          );
        },
      });
    });
  }

  changePassword = signal(false);

  toggleChangePassword() {
    this.changePassword.update((value) => !value);
  }
}
