import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeToWatch } from './free-to-watch';

describe('FreeToWatch', () => {
  let component: FreeToWatch;
  let fixture: ComponentFixture<FreeToWatch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeToWatch],
    }).compileComponents();

    fixture = TestBed.createComponent(FreeToWatch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
