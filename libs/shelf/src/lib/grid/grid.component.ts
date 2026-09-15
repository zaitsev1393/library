import { Component, inject } from '@angular/core';
import { ShelfStore } from '../shelf.store';
import { BookCardComponent } from './book-card/book-card.component';

@Component({
  selector: 'lib-grid-view',
  templateUrl: 'grid.component.html',
  styleUrls: ['grid.component.scss'],
  imports: [BookCardComponent],
})
export class GridComponent {
  public books = inject(ShelfStore).filteredBooks;
}
