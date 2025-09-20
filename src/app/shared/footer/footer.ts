import { ChangeDetectionStrategy, Component } from '@angular/core';

const DEVELOPERS_GITHUB_NAMES = ['evgeniia-korolova', 'NMakarevich', 'exact84'];

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  year = new Date().getFullYear();
  developers = DEVELOPERS_GITHUB_NAMES;
}
