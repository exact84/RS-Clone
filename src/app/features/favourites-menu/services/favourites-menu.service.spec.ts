import { TestBed } from '@angular/core/testing';

import { FavouritesMenuService } from './favourites-menu.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('FavouritesMenuService', () => {
  let service: FavouritesMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(FavouritesMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
