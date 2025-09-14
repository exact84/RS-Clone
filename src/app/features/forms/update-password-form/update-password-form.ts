import { Component, inject, OnDestroy, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  generateFieldValidationErrors,
  hasDigit,
  hasLetter,
  isMatchPasswords,
  isPasswordToShort,
} from '../../../shared/utils/validators';
import { HttpErrorResponse } from '@angular/common/http';
import { FormField } from '../../../shared/ui/form-field/form-field';
import { Subscription } from 'rxjs';
import { UpdatePasswordFormInterface } from '../models/forms.model';
import { ProfileService } from '../../../pages/profile/api/profile.service';
import { PasswordIcon } from '../../../shared/ui/password-icon/password-icon';

@Component({
  selector: 'app-update-password-form',
  imports: [ReactiveFormsModule, FormField, PasswordIcon],
  templateUrl: './update-password-form.html',
  styleUrl: './update-password-form.scss',
})
export class UpdatePasswordForm implements OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly profileService = inject(ProfileService);

  private subscription!: Subscription;

  closeChangePassword = output();

  showOldPassword = signal(false);
  showNewPassword = signal(false);
  showConfirmNewPassword = signal(false);
  isPendingRequest = signal(false);
  changePasswordSuccessful = signal(false);

  toggleOldPassword() {
    this.showOldPassword.update((value) => !value);
  }

  toggleNewPassword() {
    this.showNewPassword.update((value) => !value);
  }

  toggleConfirmOldPassword() {
    this.showConfirmNewPassword.update((value) => !value);
  }

  updatePasswordForm: FormGroup<UpdatePasswordFormInterface> = this.fb.nonNullable.group(
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
            this.changePasswordSuccessful.set(false);
            this.closeChangePassword.emit();
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
