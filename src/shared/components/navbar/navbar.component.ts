import { Component, input } from '@angular/core';
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';
import { RouterLink } from '@angular/router';
import { HamburgerMenuSvgComponent } from '../../../assets/svgs/hamburger-menu.component';
import { BoardDropDownSelectorComponent } from '../../../app/features/kanban/board/board-drop-down-selector.component';

@Component({
    selector: 'app-navbar',
    imports: [ThemeSelectorComponent, RouterLink, HamburgerMenuSvgComponent, BoardDropDownSelectorComponent],
    template: `
        <div class="du-navbar bg-base-100 shadow-lg">
            <div class="du-navbar-start">
                <div class="du-dropdown">
                    <div tabindex="0" role="button" class="du-btn du-btn-ghost lg:hidden">
                        <svg-hamburger-menu></svg-hamburger-menu>
                    </div>
                    <ul tabindex="0" class="du-menu du-menu-sm du-dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a>Home</a></li>
                        <li><a>About</a></li>
                        <li><a>Services</a></li>
                        <li><a>Contact</a></li>
                    </ul>
                </div>
                <a class="du-btn du-btn-ghost text-xl font-bold">
                    <span class="text-primary" routerLink="/home">{{ title() }}</span>
                </a>
            </div>

            <div class="du-navbar-center hidden lg:flex">
                <ul class="du-menu du-menu-horizontal px-1">
                    <li><a class="hover:text-primary" routerLink="/home">Home</a></li>
                    <!-- <li><a class="hover:text-primary" routerLink="/board/1">Board Details</a></li> -->
                    <li><app-board-drop-down-selector class="hover:text-primary" /></li>
                    <!-- <li><a class="hover:text-primary">About</a></li>
                    <li><a class="hover:text-primary">Services</a></li>
                    <li><a class="hover:text-primary">Contact</a></li> -->
                </ul>
            </div>

            <div class="du-navbar-end">
                <app-theme-selector class="mr-5" />
                <div class="du-dropdown du-dropdown-end">
                    <div tabindex="0" role="button" class="du-btn du-btn-ghost du-btn-circle du-avatar">
                        <div class="w-10 rounded-full">
                            <div class="bg-primary flex h-10 w-10 items-center justify-center rounded-full">
                                <span class="text-primary-content font-semibold">Hi</span>
                            </div>
                        </div>
                    </div>
                    <ul tabindex="0" class="du-menu du-menu-sm du-dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a>Profile</a></li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    styles: ``,
})
/**
 * Navbar
 * @param title title for the navbar
 */
export class NavbarComponent {
    title = input('');
}
