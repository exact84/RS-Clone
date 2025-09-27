import { bootstrapApplication } from '@angular/platform-browser';
import * as Sentry from '@sentry/angular';

import { appConfig } from './app/app.config';
import { App } from './app/app';
import { version } from '../package.json';

Sentry.init({
  dsn: 'https://1c43437d9526f50f6650e5a311dee80c@o4510092284067840.ingest.de.sentry.io/4510092317098064',
  release: `RS-clone@${version}`,
  sendDefaultPii: true,
  enableLogs: true,
  sampleRate: 1,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.consoleLoggingIntegration({ levels: ['log', 'warn', 'error'] }),
  ],
  tracesSampleRate: 0.2,
});

// eslint-disable-next-line unicorn/prefer-top-level-await
bootstrapApplication(App, appConfig).catch((error) => console.error(error));
