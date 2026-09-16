import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import {
  ACCEPTED_FORMATS,
  ButtonComponent,
  DownloadService,
  NoBooksComponent,
  SpinnerComponent,
  XmlParserService,
} from '@org/shared';
import { ShelfStore } from '../shelf.store';
import { ViewSwitcherComponent } from '../view-switcher/view-switcher.component';

@Component({
  selector: 'lib-shelf',
  templateUrl: './shelf.html',
  imports: [
    RouterOutlet,
    ViewSwitcherComponent,
    ButtonComponent,
    NgIcon,
    SpinnerComponent,
    NoBooksComponent,
  ],
  providers: [ShelfStore, XmlParserService, DownloadService, NoBooksComponent],
})
export class ShelfComponent {
  public readonly shelfStore = inject(ShelfStore);
  private readonly xmlParserService = inject(XmlParserService);

  public readonly books = this.shelfStore.books.value;
  public isLoading = this.shelfStore.books.isLoading;

  public readonly ACCEPTED_FORMATS = ACCEPTED_FORMATS;

  constructor() {
    effect(() => {
      console.log(this.books());
    });
  }

  addBook(): void {
    this.shelfStore.addBook();
  }

  downloadLibrary(): void {
    this.shelfStore.downloadLibrary();
  }

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const parsedXML: Record<string, any> = this.xmlParserService.xmlToJson(
        await file.text(),
      );
      if (parsedXML['library']) {
        const books = parsedXML['library']['book'];
        this.shelfStore.addParsedBooks(books);
      }
    }
  }
}
