import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetails } from './movie-details';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { VotePercentPipe } from '../../shared/pipes/vote-percent-pipe';

describe('MovieDetails', () => {
  let component: MovieDetails;
  let fixture: ComponentFixture<MovieDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetails, VotePercentPipe],
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

    fixture = TestBed.createComponent(MovieDetails);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 1);
    fixture.componentRef.setInput('type', 'movie');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
