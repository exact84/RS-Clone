import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthIcon } from './auth-icon';

describe('AuthIcon', () => {
  let component: AuthIcon;
  let fixture: ComponentFixture<AuthIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthIcon);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('icon', 'login');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
