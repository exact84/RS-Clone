import { HandlerEvent } from '@netlify/functions';

export const handler = async (event: HandlerEvent) => {
  try {
    const apiKey = process.env.NG_APP_TMDB_API_KEY;
    const rawPath = event.queryStringParameters?.path ?? '';
    const decodedPath = decodeURIComponent(rawPath);

    const url = new URL(`https://api.themoviedb.org/3${decodedPath}`);

    for (const [key, value] of Object.entries(event.queryStringParameters ?? {}).filter(
      ([key]) => key !== 'path',
    )) {
      if (value != null) url.searchParams.set(key, value);
    }

    url.searchParams.set('api_key', apiKey!);

    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: (error as Error).message }),
    };
  }
};
