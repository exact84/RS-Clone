import { InjectionToken } from '@angular/core';

export const PARAMS_TOKEN = new InjectionToken<Record<string, string | number | boolean>>(
  'PARAMS_TOKEN',
  {
    factory: () => ({}),
  },
);
