import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IconButtonComponent } from '@org/shared';

export enum ViewType {
  List = 'list',
  Grid = 'grid',
}

@Component({
  selector: 'lib-view-switcher',
  template: `
    <div class="flex gap-1">
      <lib-icon-button
        name="heroQueueList"
        (click)="switchView(ViewType.Grid)"
      />
      <lib-icon-button
        name="heroTableCells"
        (click)="switchView(ViewType.List)"
      />
    </div>
  `,
  imports: [IconButtonComponent],
})
export class ViewSwitcherComponent {
  private readonly router = inject(Router);
  public readonly ViewType = ViewType;

  public switchView(viewType: ViewType): void {
    console.log(`Switching to ${viewType} view`);
    this.router.navigate(['library', viewType], {
      queryParamsHandling: 'merge',
    });
  }
}
