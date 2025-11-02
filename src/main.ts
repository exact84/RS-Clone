import { bootstrapApplication } from '@angular/platform-browser';
import * as Sentry from '@sentry/angular';

import { appConfig } from './app/app.config';
import { App } from './app/app';
import { environment } from './environments/environment';
import { version } from '../package.json';

setTimeout(() => {
  Sentry.init({
    dsn: 'https://1c43437d9526f50f6650e5a311dee80c@o4510092284067840.ingest.de.sentry.io/4510092317098064',
    release: `RS-clone@${version}`,
    sendDefaultPii: true,
    enableLogs: true,
    sampleRate: environment.production ? 0.1 : 1,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.consoleLoggingIntegration({ levels: ['log', 'warn', 'error'] }),
    ],
    tracesSampleRate: environment.production ? 0.1 : 0.2,
  });
}, 0);

// eslint-disable-next-line unicorn/prefer-top-level-await
bootstrapApplication(App, appConfig).catch((error) => console.error(error));
