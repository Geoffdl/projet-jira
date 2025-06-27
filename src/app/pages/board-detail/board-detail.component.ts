import { Component, inject } from '@angular/core';
import { BoardComponent } from '../../features/kanban/board/board.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-board-detail',
    imports: [BoardComponent],
    template: ` <app-board [boardId]="boardId"></app-board> `,
    styles: ``,
})
export class BoardDetailComponent {
    private route = inject(ActivatedRoute);
    boardId = Number(this.route.snapshot.paramMap.get('boardId'));
}
