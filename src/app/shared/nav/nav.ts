import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [
    RouterLink
  ],
  template: `
  <div class="du-navbar  bg-primary text-primary-content">
    <button class="du-btn du-btn-ghost text-xl">{{title()}}</button>
    <a class="du-menu du-link-neutral" routerLink="/home">Home</a>
    <a class="du-menu du-link-neutral" routerLink="/board/1">Some Board</a>
</div>
  `,
  styles: ``,
})
export class Nav {
title = input('');
}
