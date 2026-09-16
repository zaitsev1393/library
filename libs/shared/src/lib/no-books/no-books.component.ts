import { Component, output } from '@angular/core';
import { ButtonComponent } from '../buttons/button/button.component';
import { ACCEPTED_FORMATS } from '../config/accepted-formats';

@Component({
  selector: 'lib-no-books',
  templateUrl: './no-books.component.html',
  imports: [ButtonComponent],
})
export class NoBooksComponent {
  public addBook = output();
  public importXML = output<Event>();

  public readonly ACCEPTED_FORMATS = ACCEPTED_FORMATS;
}
