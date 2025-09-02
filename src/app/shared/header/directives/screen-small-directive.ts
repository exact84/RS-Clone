import { Directive, effect, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { ScreenService } from '../../../core/screen-service';

@Directive({
  selector: '[appScreenSmallDirective]',
})
export class ScreenSmallDirective {
  private screenService = inject(ScreenService);
  private readonly tempRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);

  private hasView = false;

  constructor() {
    effect(() => {
      const condition = this.screenService.width() < this.screenService.largeScreen;
      if (condition && !this.hasView) {
        this.hasView = true;
        this.viewContainer.createEmbeddedView(this.tempRef);
      } else if (!condition && this.hasView) {
        this.hasView = false;
        this.viewContainer.clear();
      }
    });
  }
}
