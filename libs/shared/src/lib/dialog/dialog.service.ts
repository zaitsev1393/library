import { Dialog } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { inject, Service } from '@angular/core';

@Service()
export class DialogService {
  private readonly dialog = inject(Dialog);
  public openDialog<T>(component: ComponentType<T>) {
    return this.dialog.open(component, {
      panelClass: 'lib-dialog-base',
    });
  }
}
