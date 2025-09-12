import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeToWatch } from './free-to-watch';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('FreeToWatch', () => {
  let component: FreeToWatch;
  let fixture: ComponentFixture<FreeToWatch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeToWatch],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(FreeToWatch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
