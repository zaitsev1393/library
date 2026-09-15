import { Component, inject } from '@angular/core';
import { ShelfStore } from '../shelf.store';

@Component({
  selector: 'lib-list-view',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
})
export class ListComponent {
  private readonly shelfStore = inject(ShelfStore);
  public readonly books = this.shelfStore.books;
  public readonly filteredBooks = this.shelfStore.filteredBooks;
}
