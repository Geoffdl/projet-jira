import { Component } from '@angular/core';

@Component({
    selector: 'svg-hamburger-menu',
    template: `
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"></path>
        </svg>
    `,
})
export class HamburgerMenuSvgComponent {}
