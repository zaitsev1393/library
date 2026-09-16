import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { BookData, BookFormComponent } from '../book-form/book-form.component';
import { EditBookStore } from './edit-book.store';

@Component({
  selector: 'lib-edit-book',
  templateUrl: `edit-book.component.html`,
  imports: [BookFormComponent],
  providers: [EditBookStore],
})
export class LibEditBookComponent {
  private readonly editBookStore = inject(EditBookStore);
  private readonly DIALOG_DATA = inject(DIALOG_DATA);

  public book = this.DIALOG_DATA.book as BookData;

  public editBook(data: BookData) {
    this.editBookStore.editBook(data);
  }
}
