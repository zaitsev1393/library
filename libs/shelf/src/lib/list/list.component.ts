import { CdkMenu, CdkMenuTrigger } from '@angular/cdk/menu';
import { Component, inject } from '@angular/core';
import { Book } from '@data-access';
import { NgIcon } from '@ng-icons/core';
import { ShelfStore } from '../shelf.store';

export type SortOrder = {
  title: 'asc' | 'desc';
  author: 'asc' | 'desc';
  pages: 'asc' | 'desc';
};

@Component({
  selector: 'lib-list-view',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
  imports: [CdkMenuTrigger, CdkMenu, NgIcon],
})
export class ListComponent {
  private readonly shelfStore = inject(ShelfStore);
  public readonly books = this.shelfStore.books;
  public readonly filteredBooks = this.shelfStore.filteredBooks;

  private readonly sort: SortOrder = {
    title: 'asc',
    author: 'asc',
    pages: 'asc',
  };

  editBook(book: Book) {
    this.shelfStore.editBook(book);
  }

  deleteBook(book: Book) {
    this.shelfStore.deleteBook(book);
  }

  sortByTitle() {
    this.sort.title = this.sort.title === 'asc' ? 'desc' : 'asc';
    this.shelfStore.sortByTitle({ order: this.sort.title });
  }

  sortByAuthor() {
    this.sort.author = this.sort.author === 'asc' ? 'desc' : 'asc';
    this.shelfStore.sortByAuthor({ order: this.sort.author });
  }

  sortByPages() {
    this.sort.pages = this.sort.pages === 'asc' ? 'desc' : 'asc';
    this.shelfStore.sortByPages({ order: this.sort.pages });
  }
}
