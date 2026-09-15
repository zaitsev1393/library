import { Component, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

type ButtonColor =
  | 'brand'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

@Component({
  selector: 'lib-icon-button',
  templateUrl: './icon-button.component.html',
  imports: [NgIcon],
})
export class IconButtonComponent {
  color = input<ButtonColor>('brand');
  size = input<string>('18');
  name = input<string>('');
}
