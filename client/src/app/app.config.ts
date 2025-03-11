import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './shared/interceptors/error.interceptor';
import { authInterceptor } from './shared/interceptors/auth.interceptor';

import { InitService } from './services/init.service';
import { lastValueFrom } from 'rxjs';

import { register as registerSwiperElements } from 'swiper/element/bundle';
registerSwiperElements();

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';

function initializeApp(initService: InitService) {
  return () =>
    lastValueFrom(initService.init()).finally(() => {
      const splash = document.getElementById('initial-splash');
      if (splash) {
        splash.remove();
      }
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([errorInterceptor, loadingInterceptor, authInterceptor])
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [InitService],
    },
    provideAnimations(),
    provideToastr(),
  ],
};
