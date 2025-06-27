import { Component, input } from '@angular/core';
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-navbar',
    imports: [ThemeSelectorComponent, RouterLink],
    template: `
        <div class="du-navbar bg-primary text-primary-content border-primary-content/20 border-b shadow-lg">
            <div class="flex-1">
                <button class="du-btn du-btn-ghost text-xl font-bold" routerLink="/home">
                    {{ title() }}
                </button>
            </div>
            <div class="flex-none">
                <app-theme-selector />
                <ul class="du-menu du-menu-horizontal gap-2 px-1">
                    <li>
                        <a class="navlink" routerLink="/home" routerLinkActive="text-accent font-semibold">Home</a>
                    </li>
                    <li>
                        <a class="navlink" routerLink="/board/1" routerLinkActive="text-accent font-semibold">Some Board</a>
                    </li>
                </ul>
            </div>
        </div>
    `,
    styles: ``,
})
export class NavbarComponent {
    title = input('');
}
