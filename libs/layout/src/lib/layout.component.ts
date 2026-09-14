import { Dialog } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
  template: `<h1>Dialog</h1>`,
})
export class DialogComponent {}

@Component({
  selector: 'lib-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [HeaderComponent, RouterOutlet],
})
export class LayoutComponent {
  private dialog = inject(Dialog);
}
