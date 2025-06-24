import { Component, input } from '@angular/core';

@Component({
  selector: 'app-nav',
  imports: [],
  template: `
  <div class="du-navbar hover:du-glass bg-primary text-primary-content">
    <button class="du-btn du-btn-ghost text-xl">{{title()}}</button>
</div>
  `,
  styles: ``,
})
export class Nav {
title = input('');
}
