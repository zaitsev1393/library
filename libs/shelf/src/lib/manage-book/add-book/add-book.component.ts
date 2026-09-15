import { Component, inject } from '@angular/core';
import { BookData, BookFormComponent } from '../book-form/book-form.component';
import { AddBookStore } from './add-book.store';

@Component({
  selector: 'lib-add-book',
  templateUrl: `add-book.component.html`,
  imports: [BookFormComponent],
  providers: [AddBookStore],
})
export class LibAddBookComponent {
  private readonly addBookStore = inject(AddBookStore);
  public createBook(data: BookData) {
    this.addBookStore.createBook(data);
  }
}
