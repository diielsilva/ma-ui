import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ROUTES } from '../../shared/routes/routes';
import { SessionService } from '../services/session-service';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const sessionService = inject(SessionService);

  if (sessionService.hasAnOnlineUser()) {
    const jwt = sessionService.getSessionToken();

    const authenticatedRequest = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${jwt}`),
    });

    return next(authenticatedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        const shouldDestroySession = error.status === 401 || error.status === 403;

        if (shouldDestroySession) {
          router.navigateByUrl(ROUTES.security.login);
        }

        return throwError(() => error);
      }),
    );
  }

  return next(req);
};
