import { TestBed } from '@angular/core/testing';

import { TrendingService } from './trending-service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('TrendingService', () => {
  let service: TrendingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(TrendingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
