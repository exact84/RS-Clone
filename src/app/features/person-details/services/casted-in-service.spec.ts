import { TestBed } from '@angular/core/testing';

import { CastedInService } from './casted-in-service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { mockPersonCredits } from '../../../shared/testing/mocks/person-credits.mock';

describe('CastedInService', () => {
  let service: CastedInService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CastedInService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get casted-in cards sorted and filtered', () => {
    service.getCastedIn(101).subscribe((data) => {
      expect(data.length).toBe(3);
      expect(data[0].title).toBe('Breaking Bad');
      expect(data[1].title).toBe('Trumbo');
      expect(data[2].title).toBe('Untitled Project');
      expect(data.every((item) => !!item.poster_path)).toBeTrue();
    });

    const request = httpMock.expectOne('/person/101/combined_credits');
    expect(request.request.method).toBe('GET');
    request.flush(mockPersonCredits);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
