import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// eslint-disable-next-line unicorn/prefer-top-level-await
bootstrapApplication(App, appConfig).catch((error) => console.error(error));
