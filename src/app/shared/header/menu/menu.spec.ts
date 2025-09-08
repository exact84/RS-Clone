import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Menu } from './menu';
import { ScreenService } from '../../../core/screen-service';
import { MenuService } from './services/menu-service';
import { provideRouter } from '@angular/router';

describe('Menu', () => {
  let component: Menu;
  let fixture: ComponentFixture<Menu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu],
      providers: [provideRouter([]), ScreenService, MenuService],
    }).compileComponents();

    fixture = TestBed.createComponent(Menu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
