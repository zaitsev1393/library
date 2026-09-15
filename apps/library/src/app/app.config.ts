import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import {
  heroArrowDownTray,
  heroEllipsisHorizontal,
  heroQueueList,
  heroTableCells,
} from '@ng-icons/heroicons/outline';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideZonelessChangeDetection(),
    importProvidersFrom(
      NgIconsModule.withIcons({
        heroArrowDownTray,
        heroEllipsisHorizontal,
        heroTableCells,
        heroQueueList,
      }),
    ),
  ],
};
