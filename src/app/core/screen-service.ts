import { effect, Injectable, signal } from '@angular/core';
import { LARGE_SCREEN_BREAKPOINT } from '../shared/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  readonly largeScreen = LARGE_SCREEN_BREAKPOINT;
  readonly width = signal<number>(window.innerWidth);
  readonly height = signal<number>(window.innerHeight);

  readonly isLarge = signal(this.width() >= this.largeScreen);

  constructor() {
    window.addEventListener('resize', () => {
      this.width.set(window.innerWidth);
      this.height.set(window.innerHeight);
    });

    effect(() => {
      this.isLarge.set(this.width() >= this.largeScreen);
    });
  }
}
