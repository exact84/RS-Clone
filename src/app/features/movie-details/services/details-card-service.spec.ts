import { TestBed } from '@angular/core/testing';

import { DetailsCardService } from './details-card-service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('MovieCardService', () => {
  let service: DetailsCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(DetailsCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
