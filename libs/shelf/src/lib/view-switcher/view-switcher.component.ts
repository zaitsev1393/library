import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IconButtonComponent } from '@org/shared';

export enum ViewType {
  List = 'list',
  Grid = 'grid',
}

@Component({
  selector: 'lib-view-switcher',
  templateUrl: './view-switcher.component.html',
  imports: [IconButtonComponent],
})
export class ViewSwitcherComponent {
  private readonly router = inject(Router);
  public readonly ViewType = ViewType;

  public switchView(viewType: ViewType): void {
    this.router.navigate(['library', viewType], {
      queryParamsHandling: 'merge',
    });
  }
}
