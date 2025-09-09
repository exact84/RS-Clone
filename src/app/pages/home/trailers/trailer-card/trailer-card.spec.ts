import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerCard } from './trailer-card';
import { MovieWithTrailer } from '../../../models/movie-with-trailer';

describe('TrailerCard', () => {
  let component: TrailerCard;
  let fixture: ComponentFixture<TrailerCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrailerCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TrailerCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', {
      id: 1,
      title: 'Test Movie',
      original_title: 'Test Movie Original',
      poster_path: '/test.jpg',
      trailerKey: 'abc123',
      overview: 'Test overview',
      release_date: '2025-09-09',
      vote_average: 8.5,
      vote_count: 100,
    } satisfies MovieWithTrailer);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
