import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShelfStore } from '../shelf.store';
import { ViewSwitcherComponent } from '../view-switcher/view-switcher.component';

@Component({
  selector: 'lib-shelf',
  templateUrl: './shelf.html',
  imports: [RouterOutlet, ViewSwitcherComponent],
  providers: [ShelfStore],
})
export class ShelfComponent {
  public readonly shelfStore = inject(ShelfStore);
}
