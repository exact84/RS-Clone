import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFound } from './not-found';
import { ActivatedRoute } from '@angular/router';

describe('NotFound', () => {
  let component: NotFound;
  let fixture: ComponentFixture<NotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFound],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { url: ['not', 'found'] },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
