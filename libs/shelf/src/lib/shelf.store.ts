import { computed, inject, Injectable, Injector, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Book, BooksService } from '@data-access';
import { DialogService, DownloadService, XmlParserService } from '@org/shared';
import { LibAddBookComponent } from './manage-book/add-book/add-book.component';
import { LibEditBookComponent } from './manage-book/edit-book/edit-book.component';

const removeIds = (books: Book[]) =>
  books.map(({ author, title, pages }) => ({
    author,
    title,
    pages,
  }));

@Injectable()
export class ShelfStore {
  private readonly booksService = inject(BooksService);
  private readonly dialogService = inject(DialogService);
  private readonly injector = inject(Injector);
  private readonly xmlParserService = inject(XmlParserService);
  private readonly downloadService = inject(DownloadService);

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

  public addParsedBooks(books: Book[]) {
    this.books.update((currentBooks) => [...(currentBooks || []), ...books]);
  }

  public downloadLibrary() {
    const libraryXML = this.xmlParserService.jsonToXML({
      library: { book: removeIds(this.books.value() || []) },
    });
    this.downloadService.downloadXML(libraryXML);
  }
}
