import { Component } from '@angular/core';
import { Dashboard } from '../../dashboard/dashboard';

@Component({
    selector: 'app-home-component',
    imports: [Dashboard],
    template: ` <app-dashboard></app-dashboard> `,
    styles: ``,
})
export class HomeComponent {}
