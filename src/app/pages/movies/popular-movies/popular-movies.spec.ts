import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularMovies } from './popular-movies';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PopularMovies', () => {
  let component: PopularMovies;
  let fixture: ComponentFixture<PopularMovies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularMovies],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(PopularMovies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
