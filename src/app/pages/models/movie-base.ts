export interface MovieBase {
  id: number;
  title?: string;
  original_title: string;
  original_language?: string;
  overview: string;
  poster_path?: string;
  backdrop_path?: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
}
