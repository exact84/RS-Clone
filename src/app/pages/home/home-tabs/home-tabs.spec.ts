import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTabs } from './home-tabs';

describe('HomeTabs', () => {
  let component: HomeTabs;
  let fixture: ComponentFixture<HomeTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTabs],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeTabs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
