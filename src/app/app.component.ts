import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    styles: ``,
    template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
    title = 'simple-template-lts';
}
