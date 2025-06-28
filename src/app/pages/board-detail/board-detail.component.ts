import { Component, computed, inject } from '@angular/core';
import { BoardComponent } from '../../features/kanban/board/board.component';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-board-detail',
    imports: [BoardComponent],
    template: ` <app-board [boardId]="boardId()" [fullWidth]="true"></app-board> `,
    styles: ``,
})
/**
 * Single board view
 */
export class BoardDetailComponent {
    private route = inject(ActivatedRoute);

    private readonly paramMap = toSignal(this.route.paramMap);

    readonly boardId = computed(() => {
        const params = this.paramMap();
        return Number(params?.get('boardId')) || 1;
    });
}
