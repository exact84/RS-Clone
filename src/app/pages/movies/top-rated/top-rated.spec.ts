import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRated } from './top-rated';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('TopRated', () => {
  let component: TopRated;
  let fixture: ComponentFixture<TopRated>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopRated],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(TopRated);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
