import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import Aura from '@primeuix/themes/aura';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { JwtInterceptor } from './security/interceptors/jwt-interceptor';
import { httpErrorMessageInterceptor } from './shared/interceptors/http-error-message-interceptor';
import { httpLoadingInterceptor } from './shared/interceptors/http-loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({ theme: { preset: Aura } }),
    provideHttpClient(
      withInterceptors([httpLoadingInterceptor, httpErrorMessageInterceptor, JwtInterceptor]),
    ),
    MessageService,
  ],
};
