import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-home-tabs',
  imports: [TitleCasePipe],
  templateUrl: './home-tabs.html',
  styleUrl: './home-tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeTabs {
  readonly categories = input<readonly { label: string; value: string }[]>([]);
  readonly selected = input<string>('');
  readonly categoryClick = output<string>();

  onClick(value: string): void {
    this.categoryClick.emit(value);
  }
}
