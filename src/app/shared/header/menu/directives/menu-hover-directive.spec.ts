import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MenuHoverDirective } from './menu-hover-directive';
import { ScreenService } from '../../../../core/screen-service';
import { MenuService } from '../services/menu-service';
import { By } from '@angular/platform-browser';

@Component({
  template: ` <li appMenuHoverDirective [index]="index" [submenu]="submenu"></li> `,
  standalone: true,
  imports: [MenuHoverDirective],
})
class HostComponent {
  index = 1;
  submenu = [{ text: 'Sub', route: '/sub' }];
}

describe('MenuHoverDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let menuService: jasmine.SpyObj<MenuService>;
  let screenService: jasmine.SpyObj<ScreenService>;

  beforeEach(() => {
    menuService = jasmine.createSpyObj('MenuService', [], {
      mouseInItem: { set: jasmine.createSpy() },
      mouseInPopup: { set: jasmine.createSpy() },
      hoveredIndex: { set: jasmine.createSpy() },
      hoveredSubmenu: { set: jasmine.createSpy() },
    });

    screenService = jasmine.createSpyObj('ScreenService', ['isLarge']);
    screenService.isLarge.and.returnValue(true);

    TestBed.configureTestingModule({
      imports: [HostComponent, MenuHoverDirective],
      providers: [
        { provide: MenuService, useValue: menuService },
        { provide: ScreenService, useValue: screenService },
      ],
    });

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should set hover state on mouseenter if screen is large', () => {
    const element = fixture.debugElement.query(By.directive(MenuHoverDirective));
    element.triggerEventHandler('mouseenter', {});
    fixture.detectChanges();

    expect(menuService.mouseInItem.set).toHaveBeenCalledWith(true);
    expect(menuService.mouseInPopup.set).toHaveBeenCalledWith(true);
    expect(menuService.hoveredIndex.set).toHaveBeenCalledWith(1);
    expect(menuService.hoveredSubmenu.set).toHaveBeenCalledWith([{ text: 'Sub', route: '/sub' }]);
  });

  it('should not set hover state on mouseenter if screen is small', () => {
    screenService.isLarge.and.returnValue(false);
    const element = fixture.debugElement.query(By.directive(MenuHoverDirective));
    element.triggerEventHandler('mouseenter', {});
    fixture.detectChanges();

    expect(menuService.mouseInItem.set).not.toHaveBeenCalled();
    expect(menuService.mouseInPopup.set).not.toHaveBeenCalled();
    expect(menuService.hoveredIndex.set).not.toHaveBeenCalled();
    expect(menuService.hoveredSubmenu.set).not.toHaveBeenCalled();
  });

  it('should clear hover state on mouseleave if screen is large', () => {
    const element = fixture.debugElement.query(By.directive(MenuHoverDirective));
    element.triggerEventHandler('mouseleave', {});
    fixture.detectChanges();

    expect(menuService.mouseInItem.set).toHaveBeenCalledWith(false);
  });

  it('should not clear hover state on mouseleave if screen is small', () => {
    screenService.isLarge.and.returnValue(false);
    const element = fixture.debugElement.query(By.directive(MenuHoverDirective));
    element.triggerEventHandler('mouseleave', {});
    fixture.detectChanges();

    expect(menuService.mouseInItem.set).not.toHaveBeenCalled();
  });
});
