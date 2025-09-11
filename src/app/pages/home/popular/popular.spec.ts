import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Popular } from './popular';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Popular', () => {
  let component: Popular;
  let fixture: ComponentFixture<Popular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Popular],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Popular);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
