import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ROUTES } from '../../shared/routes/routes';
import { SessionService } from '../services/session-service';

export const adminSessionGuard: CanActivateFn = () => {
  const router = inject(Router);
  const sessionService = inject(SessionService);

  if (!sessionService.isAnAdminSession()) {
    router.navigateByUrl(ROUTES.orders.create);

    return false;
  }

  return true;
};
