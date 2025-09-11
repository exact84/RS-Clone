import { TestBed } from '@angular/core/testing';

import { PopularService } from './popular-service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PopularService', () => {
  let service: PopularService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PopularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
