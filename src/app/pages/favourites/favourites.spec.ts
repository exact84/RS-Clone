import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Favourites } from './favourites';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Favourites', () => {
  let component: Favourites;
  let fixture: ComponentFixture<Favourites>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Favourites],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Favourites);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
