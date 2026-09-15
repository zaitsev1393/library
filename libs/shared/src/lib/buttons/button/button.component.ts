import { Component, input } from '@angular/core';

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
  selector: 'lib-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  color = input<ButtonColor>('brand');
}
