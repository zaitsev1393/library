import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@org/shared';
import { BookData, BookFormComponent } from '../book-form/book-form.component';
import { EditBookStore } from './edit-book.store';

@Component({
  selector: 'lib-edit-book',
  templateUrl: `edit-book.component.html`,
  imports: [BookFormComponent, ButtonComponent],
  providers: [EditBookStore],
})
export class LibEditBookComponent {
  private readonly dialogRef = inject(DialogRef);
  private readonly editBookStore = inject(EditBookStore);
  private readonly DIALOG_DATA = inject(DIALOG_DATA);

  public book = this.DIALOG_DATA.book as BookData;

  public editBook(data: BookData) {
    this.editBookStore.editBook(data);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
