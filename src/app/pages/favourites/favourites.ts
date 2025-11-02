import { Component, effect, inject, signal } from '@angular/core';
import { FavouritesStore } from '../../shared/store/states/favourites.state';
import { Dispatcher } from '@ngrx/signals/events';
import { favouritesEvents } from '../../shared/store/events/favourites.events';
import { SliderCard } from '../home/slider-card/slider-card';
import { Spinner } from '../../shared/ui/spinner/spinner';
import { Button } from '../../shared/ui/button/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { isTakenListName } from '../../shared/utils/validators';
import { FavouritesService } from './api/favourites.service';
import { FormField } from '../../shared/ui/form-field/form-field';

@Component({
  selector: 'app-favourites',
  imports: [SliderCard, Spinner, Button, ReactiveFormsModule, FormField],
  templateUrl: './favourites.html',
  styleUrl: './favourites.scss',
})
export class Favourites {
  readonly favouritesStore = inject(FavouritesStore);
  private readonly dispatcher = inject(Dispatcher);
  private readonly fb = inject(FormBuilder);
  private readonly favouritesService = inject(FavouritesService);

  newListForm: FormGroup<{ label: FormControl<string> }> = this.fb.nonNullable.group({
    label: ['', [Validators.required, Validators.minLength(3), isTakenListName()]],
  });

  favourites = this.favouritesStore.favouritesLists;
  isLoading = this.favouritesStore.isLoading;
  errorMessage = this.favouritesStore.errorMessage;
  addNewList = signal(false);
  newListCreated = this.favouritesService.newListCreated;

  constructor() {
    if (this.favourites().length === 0)
      this.dispatcher.dispatch(favouritesEvents.loadFavourites({ withItems: true }));
    else this.dispatcher.dispatch(favouritesEvents.loadListItem());

    effect(() => {
      if (this.newListCreated()) {
        this.closeForm();
        this.favouritesService.newListCreated.set(false);
      }
    });
  }

  get label() {
    return this.newListForm.controls.label;
  }

  addList() {
    this.dispatcher.dispatch(favouritesEvents.createNewList(this.label.value));
  }

  closeForm() {
    this.addNewList.set(false);
    this.newListForm.reset();
  }
}
