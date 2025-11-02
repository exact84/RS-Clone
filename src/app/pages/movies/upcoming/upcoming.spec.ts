import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Upcoming } from './upcoming';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Upcoming', () => {
  let component: Upcoming;
  let fixture: ComponentFixture<Upcoming>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Upcoming],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Upcoming);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Upcoming');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
