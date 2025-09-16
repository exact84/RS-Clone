import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RatingColorDirective } from '../../directives/rating-color-directive';
import { VotePercentPipe } from '../../pipes/vote-percent-pipe-pipe';

@Component({
  selector: 'app-rating-badge',
  imports: [RatingColorDirective, VotePercentPipe],
  templateUrl: './rating-badge.html',
  styleUrl: './rating-badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingBadge {
  voteAverage = input.required<number>();
}
