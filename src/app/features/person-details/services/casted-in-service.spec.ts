import { TestBed } from '@angular/core/testing';

import { CastedInService } from './casted-in-service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CastedInService', () => {
  let service: CastedInService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CastedInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
