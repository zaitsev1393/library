import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewSwitcherComponent } from '../view-switcher/view-switcher.component';

@Component({
  selector: 'lib-shelf',
  templateUrl: './shelf.html',
  imports: [RouterOutlet, ViewSwitcherComponent],
})
export class ShelfComponent {}
