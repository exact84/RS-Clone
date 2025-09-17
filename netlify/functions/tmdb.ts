import { HandlerEvent } from '@netlify/functions';

export const handler = async (event: HandlerEvent) => {
  const apiKey = process.env.NG_APP_TMDB_API_KEY;
  const rawPath = event.queryStringParameters?.path ?? '';
  const decodedPath = decodeURIComponent(rawPath);
  const separator = decodedPath.includes('?') ? '&' : '?';

  const url = `https://api.themoviedb.org/3${decodedPath}${separator}api_key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
