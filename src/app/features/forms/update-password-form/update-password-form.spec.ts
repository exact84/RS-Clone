import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordForm } from './update-password-form';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ProfileService } from '../../../pages/profile/api/profile.service';

describe('UpdatePasswordForm', () => {
  let component: UpdatePasswordForm;
  let fixture: ComponentFixture<UpdatePasswordForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ProfileService],
      imports: [UpdatePasswordForm],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatePasswordForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
