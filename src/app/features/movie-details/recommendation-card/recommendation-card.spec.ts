import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationCard } from './recommendation-card';
import { provideRouter } from '@angular/router';

describe('RecommendationCard', () => {
  let component: RecommendationCard;
  let fixture: ComponentFixture<RecommendationCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendationCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RecommendationCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', {
      id: 1_035_259,
      title: 'Talk to Me',
      vote_average: 7.2,
      release_date: '2023-07-26',
      poster_path: '/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg',
    });

    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
