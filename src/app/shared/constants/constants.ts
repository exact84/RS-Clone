import { CategoryOption } from '../../pages/models/category-option';

export const NO_INDEX = -1;
export const LARGE_SCREEN_BREAKPOINT = 768;
export const SIGNUP_LS_KEY = 'sign-up-form';
export const AUTHORIZATION_KEY = 'authorization-token';
export const PASSWORD_MIN_LENGTH = 8;
export const REQUEST_DELAY_MS = 500;
export const posterURL = 'https://image.tmdb.org/t/p/w1280';
export const youtubeWatchUrl = 'https://www.youtube.com/watch?v=';
export const cardTrailerURL = 'https://image.tmdb.org/t/p/w500';
export const actorPhotoURL = 'https://image.tmdb.org/t/p/w300';
export const SPINNER_PATH = 'spinner.png';
export const FALLBACK_TITLE = 'Untitled';
export const FALLBACK_DATE = 'No date';
export const FALLBACK_POSTER = 'placeholder-movie.png';
export const FALLBACK_ACTOR = 'actor_fallback.svg';

export const CATEGORY_POPULAR: readonly CategoryOption[] = [
  { label: 'Streaming', value: 'streaming' },
  { label: 'On TV', value: 'on-tv' },
  { label: 'For Rent', value: 'for-rent' },
] as const;

export const CATEGORY_FREE: readonly CategoryOption[] = [
  { label: 'Movies', value: 'movies' },
  { label: 'TV', value: 'tv' },
] as const;

export const CATEGORY_TRENDING: readonly CategoryOption[] = [
  { label: 'Today', value: 'day' },
  { label: 'This Week', value: 'week' },
] as const;

export const CATEGORY_TRAILERS: readonly CategoryOption[] = [
  { label: 'Popular', value: 'popular' },
  { label: 'Streaming', value: 'streaming' },
  { label: 'On TV', value: 'on-tv' },
  { label: 'For Rent', value: 'for-rent' },
] as const;

export const HIGH_VOTE_COLOR = '#4caf50';
export const MIDDLE_VOTE_COLOR = '#ffeb3b';
export const LOW_VOTE_COLOR = '#f44336';
export const STROKE_DASHARRAY_TOTAL = 251.2;
