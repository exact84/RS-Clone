import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteIcons } from './favourite-icons';

describe('FavouriteIcons', () => {
  let component: FavouriteIcons;
  let fixture: ComponentFixture<FavouriteIcons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouriteIcons],
    }).compileComponents();

    fixture = TestBed.createComponent(FavouriteIcons);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('icon', 'heart');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
