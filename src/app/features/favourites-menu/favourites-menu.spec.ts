import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesMenu } from './favourites-menu';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('FavouritesMenu', () => {
  let component: FavouritesMenu;
  let fixture: ComponentFixture<FavouritesMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouritesMenu],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(FavouritesMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
