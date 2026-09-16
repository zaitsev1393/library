import { Component, input, output } from '@angular/core';
import { Book } from '@data-access';
import { NgIcon } from '@ng-icons/core';
import { RandomColorPipe } from './pipes/random-color.pipe';

@Component({
  selector: 'lib-book-card',
  templateUrl: 'book-card.component.html',
  styleUrls: ['book-card.component.scss'],
  imports: [RandomColorPipe, NgIcon],
})
export class BookCardComponent {
  public book = input<Book>();
  public editBook = output<Book | undefined>();
  public deleteBook = output<Book | undefined>();
}
