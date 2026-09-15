import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Book, BooksService } from '@data-access';

@Injectable()
export class ShelfStore {
  private readonly booksService = inject(BooksService);

  public search = signal<string>('');

  public books = rxResource<Book[], unknown>({
    stream: () => {
      return this.booksService.getBooks();
    },
  });

  public filteredBooks = computed<Book[]>(() => {
    return (this.books.value() || []).filter((book) => {
      const search = this.search();
      return book.author.includes(search) || book.title.includes(search);
    });
  });
}
