import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { catchError, throwError } from 'rxjs';
import { ErrorResponseData } from '../types/error-response-data';

export const httpErrorMessageInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  const defaultErrorMessage = 'Não foi possível se conectar com o servidor';

  return next(req).pipe(
    catchError((httpError: HttpErrorResponse) => {
      const shouldDisplayErrorMessage = httpError.status !== 403;

      if (shouldDisplayErrorMessage) {
        const wasNotAbleToConnectToTheServer = httpError.status === 0;

        if (wasNotAbleToConnectToTheServer) {
          const errorMessage: ToastMessageOptions = {
            severity: 'error',
            summary: defaultErrorMessage,
            sticky: true,
          };

          messageService.add(errorMessage);
        } else {
          const response: ErrorResponseData = {
            message: httpError.error.message,
            details: httpError.error.details,
          };

          const errorMessage: ToastMessageOptions = {
            severity: 'error',
            summary: response.message,
            sticky: true,
          };

          messageService.add(errorMessage);

          const doesResponseHaveDetails = response.details.length > 0;

          if (doesResponseHaveDetails) {
            response.details.forEach((detail) => {
              const errorMessage: ToastMessageOptions = {
                severity: 'error',
                summary: detail,
                sticky: true,
              };

              messageService.add(errorMessage);
            });
          }
        }
      }

      return throwError(() => httpError);
    }),
  );
};
