import { TestBed } from '@angular/core/testing';

import { PersonDetailsService } from './person-details-service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { mockPersonDetails } from '../../../shared/testing/mocks/person-details.mock';

describe('PersonDetailsService', () => {
  let service: PersonDetailsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PersonDetailsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get person details', () => {
    service.getPersonDetails(101).subscribe((data) => {
      expect(data.id).toBe(mockPersonDetails.id);
      expect(data.name).toBe(mockPersonDetails.name);
      expect(data.biography).toContain('Breaking Bad');
      expect(data.gender).toBe(2);
      expect(data.deathday).toBeNull();
      expect(data.homepage).toBe(mockPersonDetails.homepage ?? null);
    });

    const request = httpMock.expectOne('/person/101?language=en-US');
    expect(request.request.method).toBe('GET');
    request.flush(mockPersonDetails);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
