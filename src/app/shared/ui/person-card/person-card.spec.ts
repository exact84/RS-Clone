import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCard } from './person-card';
import { provideRouter } from '@angular/router';

describe('PersonCard', () => {
  let component: PersonCard;
  let fixture: ComponentFixture<PersonCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonCard],
      providers: [provideRouter([])],
    })

      .compileComponents();

    fixture = TestBed.createComponent(PersonCard);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('data', {
      id: 123,
      name: 'Julian Hilliard',
      character: 'David Glatzel',
      profile_path: '/lp1IJliBZb9OFP5KK09HjSGOsau.jpg',
      popularity: 0.93,
      known_for_department: 'Acting',
    });

    fixture.componentRef.setInput('size', 'sm');
    fixture.componentRef.setInput('variant', 'default');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
