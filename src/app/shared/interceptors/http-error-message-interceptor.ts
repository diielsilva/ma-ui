import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { catchError, throwError } from 'rxjs';
import { ErrorResponseData } from '../dtos/error-response-data';

export const httpErrorMessageInterceptor: HttpInterceptorFn = (req, next) => {
  const defaultMessage = 'Não foi possível se conectar com o servidor';
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((httpError) => {
      const shouldDisplayMessage =
        httpError instanceof HttpErrorResponse && httpError.status !== 403;

      if (shouldDisplayMessage) {
        const shouldDisplayDefaultMessage = httpError.status === 0;

        if (shouldDisplayDefaultMessage) {
          const toast: ToastMessageOptions = {
            severity: 'error',
            detail: defaultMessage,
            sticky: true,
          };

          messageService.add(toast);
        } else {
          const data: ErrorResponseData = {
            message: httpError.error.message,
            details: httpError.error.details,
          };

          const toast: ToastMessageOptions = {
            severity: 'error',
            detail: data.message,
            sticky: true,
          };

          messageService.add(toast);

          data.details.forEach((detail) => {
            const toast: ToastMessageOptions = { severity: 'error', detail, sticky: true };

            messageService.add(toast);
          });
        }
      }

      return throwError(() => httpError);
    }),
  );
};
