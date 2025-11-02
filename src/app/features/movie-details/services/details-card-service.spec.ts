import { TestBed } from '@angular/core/testing';

import { DetailsCardService } from './details-card-service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { mockMovieDetails } from '../../../shared/testing/mocks/movie-details.mock';
import { mockTVDetails } from '../../../shared/testing/mocks/tv-details.mock';

describe('MovieCardService', () => {
  let service: DetailsCardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(DetailsCardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get movie details with trailer', () => {
    service.getMovieDetails(1, 'movie').subscribe((data) => {
      expect(data.id).toBe(mockMovieDetails.id);
      expect(data.media_type).toBe('movie');
      expect(data.trailerKey).toBe(mockMovieDetails.trailerKey ?? null);
      expect(data.genres.length).toBeGreaterThan(0);
    });

    const request = httpMock.expectOne(`/movie/1?language=en-US&append_to_response=videos`);
    expect(request.request.method).toBe('GET');
    request.flush({
      ...mockMovieDetails,
      videos: { results: [{ type: 'Trailer', site: 'YouTube', key: mockMovieDetails.trailerKey }] },
    });
  });

  it('should get tv details with trailer', () => {
    service.getMovieDetails(2, 'tv').subscribe((data) => {
      expect(data.id).toBe(mockTVDetails.id);
      expect(data.media_type).toBe('tv');
      expect(data.trailerKey).toBe(mockTVDetails.trailerKey ?? null);
      expect(data.genres.length).toBeGreaterThan(0);
    });

    const request = httpMock.expectOne(`/tv/2?language=en-US&append_to_response=videos`);
    expect(request.request.method).toBe('GET');
    request.flush({
      ...mockTVDetails,
      videos: { results: [{ type: 'Trailer', site: 'YouTube', key: mockTVDetails.trailerKey }] },
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
