import { TestBed } from '@angular/core/testing';

import { UpcomingService } from './upcoming-service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('UpcomingService', () => {
  let service: UpcomingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UpcomingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
