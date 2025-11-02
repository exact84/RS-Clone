import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDetails } from './person-details';
import { Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PersonDetails', () => {
  let component: PersonDetails;
  let fixture: ComponentFixture<PersonDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonDetails],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonDetails);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 1);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
