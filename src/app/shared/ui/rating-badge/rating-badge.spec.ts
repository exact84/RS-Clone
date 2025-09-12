import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingBadge } from './rating-badge';

describe('RatingBadge', () => {
  let component: RatingBadge;
  let fixture: ComponentFixture<RatingBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(RatingBadge);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('voteAverage', 7.8);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
