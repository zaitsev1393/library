import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ButtonComponent,
  DownloadService,
  XmlParserService,
} from '@org/shared';
import { ShelfStore } from '../shelf.store';
import { ViewSwitcherComponent } from '../view-switcher/view-switcher.component';

@Component({
  selector: 'lib-shelf',
  templateUrl: './shelf.html',
  imports: [RouterOutlet, ViewSwitcherComponent, ButtonComponent],
  providers: [ShelfStore, XmlParserService, DownloadService],
})
export class ShelfComponent {
  public readonly shelfStore = inject(ShelfStore);
  private readonly xmlParserService = inject(XmlParserService);

  public readonly ACCEPTED_FORMATS = '.xml';

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
