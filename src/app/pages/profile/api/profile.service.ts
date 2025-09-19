import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../auth/models/signup';
import { UpdatePassword } from '../models/update-password';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly http = inject(HttpClient);

  getUser() {
    return this.http.get<User>('/user', { observe: 'response' });
  }

  updatePassword(updatePassword: UpdatePassword) {
    return this.http.patch<User>('/user', updatePassword, { observe: 'response' });
  }
}
