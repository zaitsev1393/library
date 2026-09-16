import { computed, inject, Injectable, Injector, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Book, BooksService } from '@data-access';
import {
  DialogService,
  DownloadService,
  NotificationsService,
  XmlParserService,
} from '@org/shared';
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
  private readonly notificationsService = inject(NotificationsService);

  public search = signal<string>('');

  public books = rxResource<Book[], unknown>({
    stream: () => {
      return this.booksService.getBooks();
    },
  });

  public filteredBooks = computed<Book[]>(() => {
    return (this.books.value() || []).filter((book) => {
      const search = this.search();
      return book.title.toString().includes(search);
    });
  });

  public addBook() {
    this.dialogService
      .openDialog(LibAddBookComponent, {
        injector: this.injector,
      })
      .closed.pipe()
      .subscribe((success) => {
        if (!success) return;

        this.notificationsService.showNotification({
          message: 'Book added successfully',
          type: 'success',
        });
      });
  }

  public editBook(book: Book) {
    this.dialogService
      .openDialog(LibEditBookComponent, {
        injector: this.injector,
        data: { book },
      })
      .closed.pipe()
      .subscribe((success) => {
        if (!success) return;

        this.notificationsService.showNotification({
          message: 'Book edited successfully',
          type: 'success',
        });
      });
  }

  public deleteBook({ id }: Book) {
    console.log(id);
    if (!id) return;

    this.booksService.deleteBook({ id }).subscribe(() => {
      this.books.reload();
      this.notificationsService.showNotification({
        message: 'Book deleted successfully',
        type: 'success',
      });
    });
  }

  public addParsedBooks(books: Book[]) {
    this.books.update((currentBooks) => [...(currentBooks || []), ...books]);

    this.booksService.importBooks({ body: books }).subscribe(() => {
      this.books.reload();
      this.notificationsService.showNotification({
        message: 'Books imported successfully',
        type: 'success',
      });
    });
  }

  public downloadLibrary() {
    const libraryXML = this.xmlParserService.jsonToXML({
      library: { book: removeIds(this.books.value() || []) },
    });
    this.downloadService.downloadXML(libraryXML);
  }

  public sortByTitle({ order }: { order: 'asc' | 'desc' }) {
    this.books.update((currentBooks) =>
      (currentBooks || [])
        .slice()
        .sort((a, b) =>
          order === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title),
        ),
    );
  }

  public sortByAuthor({ order }: { order: 'asc' | 'desc' }) {
    this.books.update((currentBooks) =>
      (currentBooks || [])
        .slice()
        .sort((a, b) =>
          order === 'asc'
            ? a.author.localeCompare(b.author)
            : b.author.localeCompare(a.author),
        ),
    );
  }

  public sortByPages({ order }: { order: 'asc' | 'desc' }) {
    this.books.update((currentBooks) =>
      (currentBooks || [])
        .slice()
        .sort((a, b) =>
          order === 'asc' ? a.pages - b.pages : b.pages - a.pages,
        ),
    );
  }
}
