import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerCard } from './trailer-card';

describe('TrailerCard', () => {
  let component: TrailerCard;
  let fixture: ComponentFixture<TrailerCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrailerCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TrailerCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
