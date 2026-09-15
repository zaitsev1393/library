import { computed, inject, Injectable, Injector, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Book, BooksService } from '@data-access';
import { DialogService } from '@org/shared';
import { LibAddBookComponent } from './manage-book/add-book/add-book.component';
import { LibEditBookComponent } from './manage-book/edit-book/edit-book.component';

@Injectable()
export class ShelfStore {
  private readonly booksService = inject(BooksService);
  private readonly dialogService = inject(DialogService);
  private readonly injector = inject(Injector);

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

  public addBook() {
    this.dialogService.openDialog(LibAddBookComponent, {
      injector: this.injector,
    });
  }

  public editBook(book: Book) {
    this.dialogService.openDialog(LibEditBookComponent, {
      injector: this.injector,
      data: { book },
    });
  }

  public deleteBook({ id }: Book) {
    if (!id) return;

    this.booksService.deleteBook({ id }).subscribe(() => {
      this.books.reload();
    });
  }
}
