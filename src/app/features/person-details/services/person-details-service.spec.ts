import { TestBed } from '@angular/core/testing';

import { PersonDetailsService } from './person-details-service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PersonDetailsService', () => {
  let service: PersonDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PersonDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
