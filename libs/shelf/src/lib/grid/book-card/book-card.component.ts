import { Component, input } from '@angular/core';
import { Book } from '@data-access';
import { RandomColorPipe } from './pipes/random-color.pipe';

@Component({
  selector: 'lib-book-card',
  templateUrl: 'book-card.component.html',
  styleUrls: ['book-card.component.scss'],
  imports: [RandomColorPipe],
})
export class BookCardComponent {
  book = input<Book>();
}
