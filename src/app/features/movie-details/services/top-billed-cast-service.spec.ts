import { TestBed } from '@angular/core/testing';

import { TopBilledCastService } from './top-billed-cast-service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { mockCast } from '../../../shared/testing/mocks/cast.mock';

describe('TopBilledCastService', () => {
  let service: TopBilledCastService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(TopBilledCastService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get movie cast', () => {
    service.getCast(1, 'movie').subscribe((data) => {
      expect(data.length).toBe(mockCast.length);
      expect(data[0].id).toBe(mockCast[0].id);
      expect(data[0].known_for.length).toBeGreaterThan(0);
    });

    const request = httpMock.expectOne('/movie/1/credits');
    expect(request.request.method).toBe('GET');
    request.flush({ cast: mockCast });
  });

  it('should get tv cast', () => {
    service.getCast(2, 'tv').subscribe((data) => {
      expect(data.length).toBe(mockCast.length);
      expect(data[0].id).toBe(mockCast[0].id);
      expect(data[0].known_for.length).toBeGreaterThan(0);
    });

    const request = httpMock.expectOne('/tv/2/credits');
    expect(request.request.method).toBe('GET');
    request.flush({ cast: mockCast });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
