import { Dialog } from '@angular/cdk/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { inject, Service } from '@angular/core';
import { NotificationComponent } from './notification.component';

const NOTIFICATION_CLOSE_DELAY = 5000;

@Service()
export class NotificationsService {
  private readonly dialog = inject(Dialog);
  private readonly overlay = inject(Overlay);

  showNotification({
    message,
    type,
  }: {
    message: string;
    type: 'success' | 'error' | 'warning';
  }) {
    const position = this.overlay
      .position()
      .global()
      .bottom('20px')
      .right('20px');

    const dialogRef = this.dialog.open(NotificationComponent, {
      positionStrategy: position,
      hasBackdrop: false,
      data: { message, type },
    });

    setTimeout(() => dialogRef.close(), NOTIFICATION_CLOSE_DELAY);
  }
}
