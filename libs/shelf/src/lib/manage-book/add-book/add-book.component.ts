import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, viewChild } from '@angular/core';
import { ButtonComponent } from '@org/shared';
import { BookData, BookFormComponent } from '../book-form/book-form.component';
import { AddBookStore } from './add-book.store';

@Component({
  selector: 'lib-add-book',
  templateUrl: `add-book.component.html`,
  imports: [BookFormComponent, ButtonComponent],
  providers: [AddBookStore],
})
export class LibAddBookComponent {
  private readonly addBookStore = inject(AddBookStore);
  private readonly dialogRef = inject(DialogRef);
  formComponent = viewChild(BookFormComponent);

  public addBook(book: BookData | undefined) {
    this.formComponent()?.bookForm().markAsTouched();
    if (!book) return;

    this.addBookStore.createBook(book);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
