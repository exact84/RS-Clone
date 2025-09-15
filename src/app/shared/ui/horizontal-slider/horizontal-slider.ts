import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-horizontal-slider',
  imports: [],
  templateUrl: './horizontal-slider.html',
  styleUrl: './horizontal-slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalSlider {
  title = input<string>();
  isLoading = false;
  isError = false;
}
