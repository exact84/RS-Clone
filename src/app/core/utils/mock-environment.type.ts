import { environment } from '../../../environments/environment';

export type MockEnvironment = typeof environment & {
  API_KEY: string;
  production: boolean;
};
