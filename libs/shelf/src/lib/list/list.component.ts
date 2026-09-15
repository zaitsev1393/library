import { CdkMenu, CdkMenuTrigger } from '@angular/cdk/menu';
import { Component, inject } from '@angular/core';
import { ShelfStore } from '../shelf.store';

@Component({
  selector: 'lib-list-view',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
  imports: [CdkMenuTrigger, CdkMenu],
})
export class ListComponent {
  private readonly shelfStore = inject(ShelfStore);
  public readonly books = this.shelfStore.books;
  public readonly filteredBooks = this.shelfStore.filteredBooks;

  editBook(book: any) {
    this.shelfStore.editBook(book);
  }

  deleteBook(book: any) {
    this.shelfStore.deleteBook(book);
  }
}
