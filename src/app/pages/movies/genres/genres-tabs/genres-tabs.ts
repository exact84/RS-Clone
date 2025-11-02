import { Component, input, output } from '@angular/core';
import { Genres } from '../models/genres.interface';

@Component({
  selector: 'app-genres-tabs',
  imports: [],
  templateUrl: './genres-tabs.html',
  styleUrl: './genres-tabs.scss',
})
export class GenresTabs {
  tabs = input.required<Genres[]>();
  genreSelected = output<number>();
  tabSelected = input.required<number>();

  onGenreSelect(genreId: number) {
    this.genreSelected.emit(genreId);
  }
}
