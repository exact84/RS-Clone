import { FavouritesInterface } from '../../favourites/models/favourites';

interface SignupInterface {
  login: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface SignupRequest extends SignupInterface {
  confirmPassword: string;
}

export interface User extends SignupInterface {
  id: string;
  favourites: FavouritesInterface[];
}
