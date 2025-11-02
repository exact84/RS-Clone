import { Component, computed, input } from '@angular/core';
import { RouterLink, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {
  readonly url = input<UrlSegment[]>([]);

  readonly path = computed(() => {
    const segments = this.url();
    return Array.isArray(segments) ? segments.map((s) => s.path).join('/') : '';
  });
}
