import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import Aura from '@primeuix/themes/aura';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { JwtInterceptor } from './security/interceptors/jwt-interceptor';
import { httpErrorMessageInterceptor } from './shared/interceptors/http-error-message-interceptor';
import { httpLoadingInterceptor } from './shared/interceptors/http-loading-interceptor';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-br');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({ theme: { preset: Aura } }),
    provideHttpClient(
      withInterceptors([httpLoadingInterceptor, httpErrorMessageInterceptor, JwtInterceptor]),
    ),
    MessageService,
    { provide: LOCALE_ID, useValue: 'pt-br' },
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: {
      dateFormat: 'dd/MM/yyyy HH:mm',
      timezone: '-0300'
     } },
  ],
};
