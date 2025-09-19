import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDetails } from './person-details';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('PersonDetails', () => {
  let component: PersonDetails;
  let fixture: ComponentFixture<PersonDetails>;

  const mockParameterMap: ParamMap = {
    get: (key: string) => {
      if (key === 'id') return '1';
      return null;
    },
    getAll: (key: string) => {
      void key;
      return [];
    },

    has: () => false,
    keys: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonDetails],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(mockParameterMap),
            queryParamMap: of({ get: () => null }),
            snapshot: {
              paramMap: mockParameterMap,
              queryParamMap: { get: () => null },
            },
          },
        },

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
