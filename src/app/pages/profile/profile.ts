import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { ProfileService } from './api/profile.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdatePasswordForm } from './models/update-password';
import {
  generateFieldValidationErrors,
  hasDigit,
  hasLetter,
  isMatchPasswords,
  isPasswordToShort,
} from '../../shared/utils/validators';
import { FormField } from '../../shared/ui/form-field/form-field';
import { PasswordIcon } from '../../shared/ui/password-icon/password-icon';
import { User } from '../auth/models/signup';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [FormField, PasswordIcon, ReactiveFormsModule],
  providers: [ProfileService],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile implements OnDestroy {
  private readonly profileService = inject(ProfileService);
  private readonly fb = inject(FormBuilder);

  user = signal<User | null>(null);
  errorMessage = signal('');

  userInitials = computed(() => {
    return `${this.user()?.firstName[0]}${this.user()?.lastName[0]}`;
  });
  favouritesMoviesCount = computed(() => {
    return this.user()?.favourites?.movieIds.length || 0;
  });
  favouritesPersonsCount = computed(() => {
    return this.user()?.favourites?.personIds.length || 0;
  });

  private subscription!: Subscription;

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
  changePasswordSuccessful = signal(false);

  toggleChangePassword() {
    this.changePassword.update((value) => !value);
  }

  showOldPassword = signal(false);
  showNewPassword = signal(false);
  showConfirmNewPassword = signal(false);
  isPendingRequest = signal(false);

  toggleOldPassword() {
    this.showOldPassword.update((value) => !value);
  }

  toggleNewPassword() {
    this.showNewPassword.update((value) => !value);
  }

  toggleConfirmOldPassword() {
    this.showConfirmNewPassword.update((value) => !value);
  }

  updatePasswordForm: FormGroup<UpdatePasswordForm> = this.fb.nonNullable.group(
    {
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, isPasswordToShort, hasLetter, hasDigit]],
      confirmNewPassword: ['', Validators.required],
    },
    {
      validators: [isMatchPasswords('newPassword', 'confirmNewPassword')],
    },
  );

  get oldPassword() {
    return this.updatePasswordForm.controls.oldPassword;
  }

  get newPassword() {
    return this.updatePasswordForm.controls.newPassword;
  }

  get confirmNewPassword() {
    return this.updatePasswordForm.controls.confirmNewPassword;
  }

  generateNewPasswordValidationErrors() {
    return generateFieldValidationErrors(this.newPassword, 'Password should contains');
  }

  onSubmit() {
    this.isPendingRequest.set(true);
    const { oldPassword, newPassword } = this.updatePasswordForm.getRawValue();
    this.subscription = this.profileService.updatePassword({ oldPassword, newPassword }).subscribe({
      next: (response) => {
        if (response.ok) {
          this.changePasswordSuccessful.set(true);
          this.isPendingRequest.set(false);
          setTimeout(() => {
            this.changePassword.set(false);
            this.changePasswordSuccessful.set(false);
            this.updatePasswordForm.reset();
          }, 3000);
        }
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse)
          this.updatePasswordForm.setErrors({ submitError: { message: error.error.message } });
        else if (error instanceof Error)
          this.updatePasswordForm.setErrors({ submitError: { message: error.message } });
        else this.updatePasswordForm.setErrors({ submitError: { message: 'Unknown error' } });
        this.isPendingRequest.set(false);
      },
    });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
