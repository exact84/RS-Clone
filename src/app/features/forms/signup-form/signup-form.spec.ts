import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupForm } from './signup-form';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SignupForm', () => {
  let component: SignupForm;
  let fixture: ComponentFixture<SignupForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupForm],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
