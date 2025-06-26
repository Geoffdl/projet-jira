import { Component, inject } from '@angular/core';
import { BoardComponent } from '../../dashboard/board-component/board-component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-board-details-component',
    imports: [BoardComponent],
    template: `
        <app-board-component [boardId]="boardId"> </app-board-component>
    `,
    styles: ``,
})
export class BoardDetailsComponent {
    private route = inject(ActivatedRoute);
    boardId = Number(this.route.snapshot.paramMap.get('boardId'));
}
