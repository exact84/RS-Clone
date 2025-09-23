import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFound } from './not-found';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { of } from 'rxjs';

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
            url: of([new UrlSegment('some', {}), new UrlSegment('missing', {})]),
          },
        },
      ],
    })

      .compileComponents();

    fixture = TestBed.createComponent(NotFound);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('url', [new UrlSegment('some', {})]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute path from url input', () => {
    fixture.componentRef.setInput('url', [
      new UrlSegment('some', {}),
      new UrlSegment('missing-page', {}),
    ]);
    fixture.detectChanges();

    expect(component.path()).toBe('some/missing-page');
  });

  it('should render path in template', () => {
    fixture.componentRef.setInput('url', [
      new UrlSegment('page', {}),
      new UrlSegment('not-found', {}),
    ]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('page/not-found');
  });

  it('should return empty string if url is not set', () => {
    fixture.componentRef.setInput('url', []);
    fixture.detectChanges();

    expect(component.path()).toBe('');
  });
});
