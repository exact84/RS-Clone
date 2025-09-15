import { TestBed } from '@angular/core/testing';

import { TopBilledCastService } from './top-billed-cast-service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('TopBilledCastService', () => {
  let service: TopBilledCastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(TopBilledCastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
