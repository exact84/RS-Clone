const fs = require('fs');
const apiKey = process.env.NG_APP_TMDB_API_KEY;

if (!apiKey) {
  console.error('❌ NG_APP_TMDB_API_KEY is not set!');
  process.exit(1);
}

const content = `
export const environment = {
  production: true,
  BASE_URL: 'https://api.themoviedb.org/3',
  BASE_URL_BACKEND: 'https://movie-db-backend.up.railway.app/api',
  API_KEY: '${apiKey}'
};
`;

fs.writeFileSync('src/environments/environment.production.ts', content);
console.log('✅ environment.production.ts generated');
