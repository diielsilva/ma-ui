import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { HttpLoadingService } from '../services/http-loading-service';

export const httpLoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const httpLoadingService = inject(HttpLoadingService);

  httpLoadingService.startLoading();

  return next(req).pipe(finalize(() => httpLoadingService.finishLoading()));
};
