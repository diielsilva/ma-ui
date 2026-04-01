import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SessionService } from '../services/session-service';

export const sessionDestroyerGuard: CanActivateFn = () => {
  const sessionService = inject(SessionService);

  if (sessionService.hasSession()) {
    sessionService.destroy();
  }

  return true;
};
