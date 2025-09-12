import { LOW_VOTE_COLOR, MIDDLE_VOTE_COLOR } from './../../constants/constants';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HIGHT_VOTE_COLOR } from '../../constants/constants';
import { DecimalPipe } from '@angular/common';
import { RatingColorDirective } from '../../directives/rating-color-directive';

@Component({
  selector: 'app-rating-badge',
  imports: [DecimalPipe, RatingColorDirective],
  templateUrl: './rating-badge.html',
  styleUrl: './rating-badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingBadge {
  voteAverage = input.required<number>();
  readonly percentage = computed(() => Math.round(this.voteAverage() * 10));

  readonly strokeColor = computed(() => {
    const p = this.percentage();
    return p >= 75 ? HIGHT_VOTE_COLOR : p >= 50 ? MIDDLE_VOTE_COLOR : LOW_VOTE_COLOR;
  });

  readonly strokeOffset = computed(() => {
    return 251.2 - (this.percentage() / 100) * 251.2;
  });
}
