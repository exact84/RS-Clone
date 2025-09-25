import { TestBed } from '@angular/core/testing';

import { RecommendationsService } from './recommendations-service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { mockMovieCards } from '../../../shared/testing/mocks/movie-card.mock';

describe('RecommendationsService', () => {
  let service: RecommendationsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(RecommendationsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get movie recommendations', () => {
    service.getRecommendations(1, 'movie').subscribe((data) => {
      expect(data.length).toBe(mockMovieCards.length);
      expect(data[0].media_type).toBe('movie');
      expect(data.every((item) => !!item.poster_path)).toBeTrue();
    });

    const request = httpMock.expectOne('/movie/1/recommendations');
    expect(request.request.method).toBe('GET');
    request.flush({ results: mockMovieCards });
  });

  it('should get tv recommendations', () => {
    service.getRecommendations(2, 'tv').subscribe((data) => {
      expect(data.length).toBe(mockMovieCards.length);
      expect(data[0].media_type).toBe('tv');
      expect(data.every((item) => !!item.poster_path)).toBeTrue();
    });

    const request = httpMock.expectOne('/tv/2/recommendations');
    expect(request.request.method).toBe('GET');
    request.flush({ results: mockMovieCards.map((item) => ({ ...item, media_type: 'tv' })) });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
