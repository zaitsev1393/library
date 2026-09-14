import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'lib-no-books',
  templateUrl: './no-books.component.html',
  imports: [ButtonComponent],
})
export class NoBooksComponent {
  addBook() {
    console.log('Add Book button clicked');
  }

  exportXML() {
    console.log('Export XML button clicked');
  }
}
