import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresTabs } from './genres-tabs';

describe('GenresTabs', () => {
  let component: GenresTabs;
  let fixture: ComponentFixture<GenresTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenresTabs],
    }).compileComponents();

    fixture = TestBed.createComponent(GenresTabs);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tabs', [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Comedy' },
    ]);

    fixture.componentRef.setInput('tabSelected', 2);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive tabs input correctly', () => {
    expect(component.tabs()).toEqual([
      { id: 1, name: 'Action' },
      { id: 2, name: 'Comedy' },
    ]);
  });

  it('should receive tabSelected input correctly', () => {
    expect(component.tabSelected()).toBe(2);
  });

  it('should emit genreSelected when onGenreSelect is called', () => {
    spyOn(component.genreSelected, 'emit');

    component.onGenreSelect(1);
    expect(component.genreSelected.emit).toHaveBeenCalledWith(1);
  });

  it('should highlight active tab based on tabSelected', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const activeButton = compiled.querySelector('.tabs-btn.active');

    expect(activeButton?.textContent).toContain('Comedy');
  });
});
