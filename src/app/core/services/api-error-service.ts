import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiErrorService {
  private readonly _error = signal<string | null>(null);

  get errorMessage(): Signal<string | null> {
    return this._error.asReadonly();
  }

  handleApiError<T>(errorMessage: WritableSignal<string | null>, context?: string) {
    return (source: Observable<T>): Observable<T> =>
      source.pipe(
        catchError((error: HttpErrorResponse) => {
          const httpError = error as { status?: number; message?: string };

          const status = httpError.status ?? 0;
          const message =
            status === 401
              ? 'Authorization error: missing or invalid key'
              : `Error ${status}: ${httpError.message ?? 'Unknown error'}`;

          const fullMessage = context ? `${context}: ${message}` : message;

          errorMessage.set(fullMessage);

          console.error(fullMessage);

          return throwError(() => httpError);
        }),
      );
  }
}
