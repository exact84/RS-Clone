import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetails } from './movie-details';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { VotePercentPipe } from '../../shared/pipes/vote-percent-pipe';

describe('MovieDetails', () => {
  let component: MovieDetails;
  let fixture: ComponentFixture<MovieDetails>;

  const mockParameterMap: ParamMap = {
    get: (key: string) => {
      if (key === 'id') return '1';
      if (key === 'type') return 'tv';
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
      imports: [MovieDetails, VotePercentPipe],
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

    fixture = TestBed.createComponent(MovieDetails);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
