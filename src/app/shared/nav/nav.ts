import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeSelectorComponent } from '../theme-selector-component/theme-selector-component';

@Component({
    selector: 'app-nav',
    imports: [RouterLink, ThemeSelectorComponent],
    template: `
        <div
            class="du-navbar bg-primary text-primary-content border-primary-content/20 border-b shadow-lg"
        >
            <div class="flex-1">
                <button class="du-btn du-btn-ghost text-xl font-bold">
                    {{ title() }}
                </button>
            </div>
            <div class="flex-none">
                <app-theme-selector-component></app-theme-selector-component>
                <ul class="du-menu du-menu-horizontal gap-2 px-1">
                    <li>
                        <a
                            class="navlink"
                            routerLink="/home"
                            routerLinkActive="text-accent font-semibold"
                            >Home</a
                        >
                    </li>
                    <li>
                        <a
                            class="navlink"
                            routerLink="/board/1"
                            routerLinkActive="text-accent font-semibold"
                            >Some Board</a
                        >
                    </li>
                </ul>
            </div>
        </div>
    `,
    styles: ``,
})
export class Nav {
    title = input('');
}
