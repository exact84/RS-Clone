import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { PeopleService } from './services/people-service';
import { PersonCard } from '../../shared/ui/person-card/person-card';
import { Person } from '../models/people/person.interface';
import { SPINNER_PATH } from '../../shared/constants/constants';

@Component({
  selector: 'app-people',
  imports: [PersonCard],
  templateUrl: './people.html',
  styleUrl: './people.scss',
})
export class People implements OnInit {
  private readonly peopleService = inject(PeopleService);
  readonly spinnerPath = SPINNER_PATH;
  readonly error = signal<string | null>(null);
  readonly loading = signal(false);

  readonly people = signal<Person[]>([]);
  readonly currentPage = signal(1);
  readonly totalPages = signal(0);

  readonly hasNextPage = computed(() => this.currentPage() < this.totalPages());
  readonly hasPrevPage = computed(() => this.currentPage() > 1);
  readonly pageNumbers = computed(() => this.getPageNumbers());

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople() {
    this.loading.set(true);
    this.error.set(null);

    this.peopleService.getPeople(this.currentPage()).subscribe({
      next: (response) => {
        this.people.set(response.results);
        this.totalPages.set(response.total_pages);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('People load error:', error);
        this.error.set('Failed to load people. Please try again.');
        this.loading.set(false);
      },
    });
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((page) => page + 1);
      this.loadPeople();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((page) => page - 1);
      this.loadPeople();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goToPage(page: number | string): void {
    const pageNumber = Number(page);
    const total = this.totalPages();

    if (
      Number.isFinite(pageNumber) &&
      pageNumber >= 1 &&
      pageNumber <= total &&
      pageNumber !== this.currentPage()
    ) {
      this.currentPage.set(pageNumber);
      this.loadPeople();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getPageNumbers(): (number | string)[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const delta = 2;
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l = 0;

    for (let index = 1; index <= total; index++) {
      if (
        index === 1 ||
        index === total ||
        (index >= current - delta && index <= current + delta)
      ) {
        range.push(index);
      }
    }

    for (const index of range) {
      if (l) {
        if (Number(index) - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (Number(index) - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(index);
      l = Number(index);
    }

    return rangeWithDots;
  }
}
