import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubMenu } from './sub-menu';
import { MenuService } from '../services/menu-service';
import { MenuItem } from '../models/menu-item.interface';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  template: `<app-sub-menu
    [menu]="menu"
    [parentRoute]="parentRoute"
    (navigate)="onNavigate()"
  ></app-sub-menu>`,
  standalone: true,
  imports: [SubMenu],
})
class HostComponent {
  menu: MenuItem[] = [
    { text: 'Home', route: '/home' },
    { text: 'About', route: '/about' },
  ];
  parentRoute = '/root';
  navigated = false;

  onNavigate() {
    this.navigated = true;
  }
}

describe('SubMenu', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubMenu],
      providers: [
        provideRouter([]),
        { provide: MenuService, useValue: jasmine.createSpyObj('MenuService', ['dummy']) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render menu items', () => {
    const links = fixture.debugElement.queryAll(By.css('a'));
    expect(links.length).toBe(2);
    expect(links[0].nativeElement.textContent).toContain('Home');
    expect(links[1].nativeElement.textContent).toContain('About');
  });

  it('should emit navigate when triggered', () => {
    host.onNavigate();
    expect(host.navigated).toBeTrue();
  });
});
