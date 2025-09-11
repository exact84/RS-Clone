import { TestBed } from '@angular/core/testing';

import { FreeToWatchService } from './free-to-watch-service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('FreeToWatchService', () => {
  let service: FreeToWatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(FreeToWatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
