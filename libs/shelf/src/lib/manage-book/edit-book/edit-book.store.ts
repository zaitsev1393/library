import { DialogRef } from '@angular/cdk/dialog';
import { inject, Injectable } from '@angular/core';
import { Book, BooksService } from '@data-access';
import { ShelfStore } from '../../shelf.store';
import { BookData } from '../book-form/book-form.component';

@Injectable()
export class EditBookStore {
  private readonly booksService = inject(BooksService);
  private readonly dialogRef = inject(DialogRef);
  private readonly shelfStore = inject(ShelfStore);

  public editBook({ id, title, author, pages }: BookData) {
    const body: Book = {
      id,
      title,
      author,
      pages,
    };
    this.booksService.updateBook({ id: id as number, body }).subscribe(() => {
      this.dialogRef.close(true);
      this.shelfStore.books.reload();
    });
  }
}
