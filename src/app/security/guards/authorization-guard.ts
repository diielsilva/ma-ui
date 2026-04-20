import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ROUTES } from '../../shared/routes/routes';
import { SessionService } from '../services/session-service';

export const authorizationGuard: CanActivateFn = () => {
  const router = inject(Router);
  const sessionService = inject(SessionService);

  if (!sessionService.hasAnOnlineUser()) {
    router.navigateByUrl(ROUTES.security.login);

    return false;
  }

  return true;
};
