import { TestBed } from '@angular/core/testing';

import { RecommendationsService } from './recommendations-service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('RecommendationsService', () => {
  let service: RecommendationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(RecommendationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
