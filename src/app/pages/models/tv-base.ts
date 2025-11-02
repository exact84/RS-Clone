export interface TVBase {
  id: number;
  name?: string;
  original_name: string;
  original_language: string;
  overview: string;
  poster_path?: string;
  backdrop_path?: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
}
