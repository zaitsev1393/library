import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from '@org/shared';
import { ShelfStore } from '../shelf.store';
import { ViewSwitcherComponent } from '../view-switcher/view-switcher.component';

@Component({
  selector: 'lib-shelf',
  templateUrl: './shelf.html',
  imports: [RouterOutlet, ViewSwitcherComponent, ButtonComponent],
  providers: [ShelfStore],
})
export class ShelfComponent {
  public readonly shelfStore = inject(ShelfStore);

  addBook(): void {
    console.log('Add book');
  }

  importBooks(type: string): void {
    console.log('Import books');
  }
}
