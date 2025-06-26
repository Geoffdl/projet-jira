import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-theme-selector-component',
    imports: [FormsModule],
    template: `
        <button class="du-btn du-btn-outline" popovertarget="theme-popover" style="anchor-name: --theme-anchor">Theme: {{ currentTheme }}</button>

        <ul
            popover
            id="theme-popover"
            style="position-anchor: --theme-anchor"
            class="du-dropdown du-menu bg-secondary/99 text-accent-content du-w-52 du-rounded-box du-shadow max-h-96 overflow-y-auto"
        >
            @for (theme of themes; track $index) {
                <li (click)="setTheme(theme)">
                    <a [class.du-active]="theme === currentTheme">{{ theme }}</a>
                </li>
            }
        </ul>
    `,
    styles: ``,
})
export class ThemeSelectorComponent {
    themes = [
        'light',
        'dark',
        'cupcake',
        'bumblebee',
        'emerald',
        'corporate',
        'synthwave',
        'retro',
        'cyberpunk',
        'valentine',
        'halloween',
        'garden',
        'forest',
        'aqua',
        'lofi',
        'pastel',
        'fantasy',
        'wireframe',
        'black',
        'luxury',
        'dracula',
        'cmyk',
        'autumn',
        'business',
        'acid',
        'lemonade',
        'night',
        'coffee',
        'winter',
        'dim',
        'nord',
        'sunset',
    ];
    currentTheme = 'synthwave';

    constructor() {
        this.init();
    }

    init() {
        const saved = localStorage.getItem('theme');
        this.currentTheme = saved ? saved : 'synthwave';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
    }
    setTheme(theme: string) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        const popover = document.getElementById('theme-popover') as HTMLDivElement;
        popover?.hidePopover?.();
    }
}
