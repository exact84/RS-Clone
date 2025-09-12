import { Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';
import {
  HIGH_VOTE_COLOR,
  MIDDLE_VOTE_COLOR,
  LOW_VOTE_COLOR,
  STROKE_DASHARRAY_TOTAL,
} from '../constants/constants';

@Directive({
  selector: '[appRatingColorDirective]',
})
export class RatingColorDirective {
  private element = inject(ElementRef);
  private renderer = inject(Renderer2);

  voteAverage = input.required<number>();

  constructor() {
    effect(() => {
      const percentage = Math.round(this.voteAverage() * 10);
      const color =
        percentage >= 75 ? HIGH_VOTE_COLOR : percentage >= 50 ? MIDDLE_VOTE_COLOR : LOW_VOTE_COLOR;

      const offset = STROKE_DASHARRAY_TOTAL - (percentage / 100) * 251.2;

      this.renderer.setAttribute(this.element.nativeElement, 'stroke', color);
      this.renderer.setAttribute(
        this.element.nativeElement,
        'stroke-dashoffset',
        offset.toString(),
      );
    });
  }
}
