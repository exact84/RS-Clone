import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Trailers } from './trailers';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Trailers', () => {
  let component: Trailers;
  let fixture: ComponentFixture<Trailers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Trailers],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Trailers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
