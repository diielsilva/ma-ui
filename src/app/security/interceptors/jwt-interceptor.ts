import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SessionService } from '../services/session-service';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  if (sessionService.hasSession()) {
    const jwt = sessionService.sessionToken;

    const authenticatedRequest = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${jwt}`),
    });

    return next(authenticatedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        const shouldDestroySession = error.status === 401 || error.status === 403;

        if (shouldDestroySession) {
          router.navigateByUrl('/users/login');
        }

        return throwError(() => error);
      }),
    );
  }

  return next(req);
};
