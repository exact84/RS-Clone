import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
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
}
