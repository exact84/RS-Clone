import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordIcon } from './password-icon';

describe('PasswordIcon', () => {
  let component: PasswordIcon;
  let fixture: ComponentFixture<PasswordIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
