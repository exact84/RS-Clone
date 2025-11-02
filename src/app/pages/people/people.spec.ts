import { ComponentFixture, TestBed } from '@angular/core/testing';

import { People } from './people';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('People', () => {
  let component: People;
  let fixture: ComponentFixture<People>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [People],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(People);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
