import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuClickDirective } from './menu-click-directive';
import { MenuService } from '../services/menu-service';
import { ScreenService } from '../../../../core/screen-service';
import { NO_INDEX } from '../../../constants/constants';
import { MenuItem } from '../models/menu-item.interface';

interface SignalMock<T> {
  (): T;
  set: jasmine.Spy<(value: T) => void>;
}

@Component({
  standalone: true,
  imports: [MenuClickDirective],
  template: `<div appMenuClickDirective [index]="1" [submenu]="submenu"></div>`,
})
class TestHostComponent {
  submenu: MenuItem[] = [{ text: 'Sub', route: '/sub' }];
}

describe('MenuClickDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  let clickedIndexMock: SignalMock<number>;
  let hoveredSubmenuMock: SignalMock<MenuItem[]>;
  let menuServiceMock: MenuService;
  let screenServiceMock: jasmine.SpyObj<ScreenService>;

  beforeEach(async () => {
    clickedIndexMock = jasmine
      .createSpy('clickedIndex')
      .and.returnValue(NO_INDEX) as unknown as SignalMock<number>;
    clickedIndexMock.set = jasmine.createSpy('clickedIndex.set');

    hoveredSubmenuMock = jasmine
      .createSpy('hoveredSubmenu')
      .and.returnValue([]) as unknown as SignalMock<MenuItem[]>;
    hoveredSubmenuMock.set = jasmine.createSpy('hoveredSubmenu.set');

    menuServiceMock = {
      showVerticalMenu: true,
      clickedIndex: clickedIndexMock,
      hoveredSubmenu: hoveredSubmenuMock,
    } as unknown as MenuService;

    screenServiceMock = jasmine.createSpyObj('ScreenService', ['isLarge']);
    screenServiceMock.isLarge.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        { provide: MenuService, useValue: menuServiceMock },
        { provide: ScreenService, useValue: screenServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set clickedIndex and hoveredSubmenu when clicked on small screen and submenu exists', () => {
    const div: HTMLElement = fixture.nativeElement.querySelector('div');
    div.click();

    expect(clickedIndexMock.set).toHaveBeenCalledWith(1);
    expect(hoveredSubmenuMock.set).toHaveBeenCalledWith(host.submenu);
  });

  it('should do nothing when screen is large', () => {
    screenServiceMock.isLarge.and.returnValue(true);

    const div: HTMLElement = fixture.nativeElement.querySelector('div');
    div.click();

    expect(clickedIndexMock.set).not.toHaveBeenCalled();
    expect(hoveredSubmenuMock.set).not.toHaveBeenCalled();
  });
});
