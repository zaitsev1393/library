import { inject, Injectable } from '@angular/core';
import { BooksService, CreateBook } from '@data-access';
import { ShelfStore } from '../../shelf.store';
import { BookData } from '../book-form/book-form.component';

@Injectable()
export class AddBookStore {
  private readonly booksService = inject(BooksService);
  private readonly shelfStore = inject(ShelfStore);
  public createBook({ title, author, pages }: BookData) {
    const body: CreateBook = {
      title,
      author,
      pages,
    };
    this.booksService.createBook({ body }).subscribe(() => {
      this.shelfStore.books.reload();
    });
  }
}
