import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavbarComponent, FooterComponent],
    styles: ``,
    template: ` <app-navbar [title]="'Jirafe'"></app-navbar>
        <main class="bg-base-200 page-content min-h-screen">
            <section class="flex-1 overflow-auto p-4">
                <router-outlet></router-outlet>
            </section>
        </main>
        <app-footer></app-footer>`,
})
export class AppComponent {
    title = 'simple-template-lts';
}
