import { ErrorHandler, inject } from '@angular/core';
import { NotificationsService } from '../notifications/notifications.service';

export class LibErrorHandler implements ErrorHandler {
  private readonly notificationsService = inject(NotificationsService);
  handleError(): void {
    this.notificationsService.showNotification({
      message: 'An error occurred',
      type: 'error',
    });
  }
}
