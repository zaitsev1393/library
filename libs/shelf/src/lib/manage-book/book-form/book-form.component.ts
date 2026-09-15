import { DialogRef } from '@angular/cdk/dialog';
import {
  Component,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { form, FormField, min, required } from '@angular/forms/signals';

export interface BookData {
  id?: number;
  title: string;
  author: string;
  pages: number;
}

@Component({
  selector: 'lib-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
  imports: [FormField],
})
export class BookFormComponent {
  private readonly dialogRef = inject(DialogRef);

  book = input<BookData>();
  submitted = output<BookData>();

  constructor() {
    effect(() => {
      const book = this.book();
      if (!book) return;
      this.bookModel.set(book);
    });
  }

  public bookModel = signal<BookData>({
    id: undefined,
    title: '',
    author: '',
    pages: 0,
  });

  public bookForm = form(this.bookModel, (schemaPath) => {
    required(schemaPath.title, { message: 'Title is required' });
    required(schemaPath.author, { message: 'Author is required' });
    min(schemaPath.pages, 0, {
      message: 'Pages number cannot be less than zero',
    });
  });

  onSubmit(): void {
    if (this.bookForm().invalid()) return;

    const bookData = this.bookModel();
    this.submitted.emit(bookData);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
