import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingColorDirective } from './rating-color-directive';
import { TestHostComponent } from './test-host';
import { HIGH_VOTE_COLOR, LOW_VOTE_COLOR } from '../constants/constants';

describe('RatingColorDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let circle: SVGCircleElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent, RatingColorDirective],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    circle = fixture.nativeElement.querySelector('circle');
  });

  it('should set correct stroke color and offset for rating 7.5', () => {
    const expectedColor = HIGH_VOTE_COLOR;
    const expectedOffset = 251.2 - (75 / 100) * 251.2;

    expect(circle.getAttribute('stroke')).toBe(expectedColor);
    expect(circle.getAttribute('stroke-dashoffset')).toBeCloseTo(expectedOffset, 1);
  });

  it('should update stroke when rating changes', async () => {
    fixture.componentRef.setInput('voteAverage', 4.5);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const expectedColor = LOW_VOTE_COLOR;
    const expectedOffset = 251.2 - (45 / 100) * 251.2;

    expect(circle.getAttribute('stroke')).toBe(expectedColor);
    expect(Number(circle.getAttribute('stroke-dashoffset'))).toBeCloseTo(expectedOffset, 1);
  });
});
