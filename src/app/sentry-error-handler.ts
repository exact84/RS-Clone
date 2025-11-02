import { ErrorHandler, Injectable } from '@angular/core';
import * as Sentry from '@sentry/angular';

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  handleError(error: { originalError?: Error }): void {
    console.error('Sent to Sentry.', error);
    const originalError = error?.originalError || error;
    Sentry.withScope((scope) => {
      scope.setExtra('customMessage', 'Error sent to Sentry');
      Sentry.captureException(originalError);
    });
  }
}
