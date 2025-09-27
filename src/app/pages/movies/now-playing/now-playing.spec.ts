import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NowPlaying } from './now-playing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('NowPlaying', () => {
  let component: NowPlaying;
  let fixture: ComponentFixture<NowPlaying>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NowPlaying],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(NowPlaying);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
