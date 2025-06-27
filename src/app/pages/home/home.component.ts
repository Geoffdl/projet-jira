import { Component } from '@angular/core';
import { AllBoardsComponent } from '../../features/kanban/all-boards/all-boards.component';

@Component({
    selector: 'app-home',
    imports: [AllBoardsComponent],
    template: ` <app-all-boards /> `,
    styles: ``,
})
export class HomeComponent {}
