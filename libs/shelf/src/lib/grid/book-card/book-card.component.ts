import { Component, input } from '@angular/core';
import { Book } from '@data-access';

@Component({
  selector: 'lib-book-card',
  templateUrl: 'book-card.component.html',
  styleUrls: ['book-card.component.scss'],
})
export class BookCardComponent {
  book = input<Book>();
}
