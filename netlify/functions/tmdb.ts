import { HandlerEvent } from '@netlify/functions';

export const handler = async (event: HandlerEvent) => {
  const apiKey = process.env.NG_APP_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3${event.queryStringParameters?.path}?api_key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
