import { TestBed } from '@angular/core/testing';

import { TrendingService } from './trending-service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { mockMovieCards } from '../../../../shared/testing/mocks/movie-card.mock';

describe('TrendingService', () => {
  let service: TrendingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(TrendingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get trending data', () => {
    service.getTrending('movie', 'day').subscribe((data) => {
      expect(data).toEqual(mockMovieCards);
      expect(data.length).toBe(mockMovieCards.length);
    });

    const request = httpMock.expectOne('/trending/movie/day');
    expect(request.request.method).toBe('GET');
    request.flush({ results: mockMovieCards });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
