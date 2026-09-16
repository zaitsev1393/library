import { DialogRef } from '@angular/cdk/dialog';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { form, FormField, min, required } from '@angular/forms/signals';
import { ButtonComponent } from '@org/shared';

export interface BookData {
  id?: number;
  title: string;
  author: string;
  pages: number;
}

enum BookFormMode {
  ADD = 'add',
  EDIT = 'edit',
}

@Component({
  selector: 'lib-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
  imports: [FormField, ButtonComponent],
})
export class BookFormComponent {
  private readonly dialogRef = inject(DialogRef);

  public readonly book = input<BookData>();
  public readonly submitted = output<BookData>();

  public readonly mode = signal<BookFormMode>(BookFormMode.ADD);
  public readonly buttonText = computed(() =>
    this.mode() === BookFormMode.ADD ? 'Add' : 'Edit',
  );

  constructor() {
    effect(() => {
      const book = this.book();

      if (!book) return;

      this.mode.set(BookFormMode.EDIT);
      this.bookModel.set(book);
    });
  }

  private bookModel = signal<BookData>({
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

  public onSubmit(): void {
    if (this.bookForm().invalid()) {
      this.bookForm().markAsTouched();
      return;
    }

    const bookData = this.bookModel();

    this.submitted.emit(bookData);
  }

  public cancel(): void {
    this.dialogRef.close(false);
  }
}
