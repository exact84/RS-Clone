import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RatingColorDirective } from './rating-color-directive';

@Component({
  selector: 'app-test-host',
  template: `<circle
    appRatingColorDirective
    [voteAverage]="voteAverage()"
    cx="50"
    cy="50"
    r="40"
    stroke-width="8"
    fill="none"
    stroke-dasharray="251.2"
    transform="rotate(-90 50 50)"
  />`,
  imports: [RatingColorDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestHostComponent {
  voteAverage = input(7.5);
}
