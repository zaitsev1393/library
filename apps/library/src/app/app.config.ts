import {
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
  inject,
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
import { NotificationsService } from '@org/shared';
import { appRoutes } from './app.routes';

class LibErrorHandler implements ErrorHandler {
  private readonly notificationsService = inject(NotificationsService);
  handleError(error: any): void {
    this.notificationsService.showNotification({
      message: 'An error occurred',
      type: 'error',
    });
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideZonelessChangeDetection(),
    {
      provide: ErrorHandler,
      useClass: LibErrorHandler,
    },
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
