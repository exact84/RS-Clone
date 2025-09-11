import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderCard } from './slider-card';
import { MovieCard } from '../../models/movie-card';

describe('SliderCard', () => {
  let component: SliderCard;
  let fixture: ComponentFixture<SliderCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderCard],
    }).compileComponents();

    fixture = TestBed.createComponent(SliderCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', {
      id: 1,
      title: 'Test Movie',
      original_title: 'Test Movie Original',
      poster_path: '/test.jpg',
      overview: 'Test overview',
      release_date: '2025-09-09',
      vote_average: 8.5,
      vote_count: 100,
    } satisfies MovieCard);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
