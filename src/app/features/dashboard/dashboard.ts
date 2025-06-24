import { Component } from '@angular/core';
import { Board } from '../../shared/board/board';

@Component({
  selector: 'app-dashboard',
  imports: [
    Board
  ],
  template: `
<h1 class="text-6xl text-primary hover:text-accent pb-8">Dashboard</h1>
 <app-board/>`,
  styles: ``,
})
export class Dashboard {

}
