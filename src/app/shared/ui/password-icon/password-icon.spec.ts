import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordIcon } from './password-icon';

describe('PasswordIcon', () => {
  let fixture: ComponentFixture<PasswordIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordIcon);

    fixture.componentRef.setInput('showPassword', true);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
