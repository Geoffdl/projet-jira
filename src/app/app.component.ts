import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { MainContentComponent } from '../shared/components/main-content/main-content.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavbarComponent, FooterComponent, MainContentComponent],
    styles: ``,
    template: `
        <div class="flex min-h-screen flex-col">
            <!-- Navbar -->
            <app-navbar [title]="'Jirafe'"></app-navbar>

            <!-- Main Content Area-->
            <app-main-content>
                <router-outlet></router-outlet>
            </app-main-content>

            <!-- Footer -->
            <app-footer></app-footer>

            <!-- Router Outlet -->
        </div>
    `,
})
export class AppComponent {
    title = 'simple-template-lts';
}
