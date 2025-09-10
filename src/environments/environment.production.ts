const { NG_APP_TMDB_API_KEY = '' } = import.meta.env ?? {};
console.log('🔍 ENV from environment.production.ts:', NG_APP_TMDB_API_KEY || 'not found');

export const environment = {
  production: true,
  BASE_URL: 'https://api.themoviedb.org/3',
  BASE_URL_BACKEND: 'https://movie-db-backend.up.railway.app/api',
  API_KEY: NG_APP_TMDB_API_KEY,
};
