import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { appRoutes } from '../../shared/routes/application-routes';
import { SessionService } from '../services/session-service';

export const adminSessionGuard: CanActivateFn = () => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  if (!sessionService.isAnAdminSession()) {
    router.navigateByUrl(appRoutes.orders.create);

    return false;
  }
  
  return true;
};
