import { Component, inject } from '@angular/core';
import { Book } from '@data-access';
import { ShelfStore } from '../shelf.store';
import { BookCardComponent } from './book-card/book-card.component';

@Component({
  selector: 'lib-grid-view',
  templateUrl: 'grid.component.html',
  styleUrls: ['grid.component.scss'],
  imports: [BookCardComponent],
})
export class GridComponent {
  public readonly shelfStore = inject(ShelfStore);
  public readonly books = this.shelfStore.filteredBooks;

  editBook(book: Book | undefined) {
    if (!book) return;
    this.shelfStore.editBook(book);
  }

  deleteBook(book: Book | undefined) {
    if (!book) return;
    this.shelfStore.deleteBook(book);
  }
}
