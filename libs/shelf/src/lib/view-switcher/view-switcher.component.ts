import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@org/shared';

export enum ViewType {
  List = 'list',
  Grid = 'grid',
}

@Component({
  selector: 'lib-view-switcher',
  template: `
    <div class="flex gap-1">
      <lib-button (click)="switchView(ViewType.List)">List</lib-button>
      <lib-button (click)="switchView(ViewType.Grid)">Grid</lib-button>
    </div>
  `,
  imports: [ButtonComponent],
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
