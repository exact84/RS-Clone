import { TestBed } from '@angular/core/testing';

import { NowPlayingService } from './now-playing-service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('NowPlayingService', () => {
  let service: NowPlayingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(NowPlayingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
