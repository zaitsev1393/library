import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'lib-notification',
  templateUrl: './notification.component.html',
})
export class NotificationComponent {
  private readonly dialogRef = inject(DialogRef);
  private readonly DIALOG_DATA = inject(DIALOG_DATA);

  public message = signal<string>(this.DIALOG_DATA.message);
  public type = signal<'success' | 'error' | 'warning'>(this.DIALOG_DATA.type);

  close(): void {
    this.dialogRef.close();
  }
}
