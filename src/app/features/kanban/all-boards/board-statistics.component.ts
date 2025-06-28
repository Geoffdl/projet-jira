import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBoards } from '../../../store/board.selectors';

@Component({
    selector: 'app-board-statistics',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    template: `
        <div class="flex justify-center gap-6">
            <div class="du-stat bg-base-300 rounded-box">
                <div class="du-stat-title">Boards</div>
                <div class="du-stat-value text-primary">{{ boardsCount() }}</div>
            </div>

            <div class="du-stat bg-base-300 rounded-box">
                <div class="du-stat-title">Lists</div>
                <div class="du-stat-value text-secondary">{{ listsCount() }}</div>
            </div>

            <div class="du-stat bg-base-300 rounded-box">
                <div class="du-stat-title">Tasks</div>
                <div class="du-stat-value text-accent">{{ tasksCount() }}</div>
            </div>
        </div>
    `,
    styles: ``,
})
export class BoardStatisticsComponent {
    private readonly store = inject(Store);

    private readonly boards = computed(() => {
        return this.store.selectSignal(selectBoards)() ?? [];
    });

    readonly boardsCount = computed(() => {
        return this.boards().length;
    });

    readonly listsCount = computed(() => {
        return this.boards().reduce((total, board) => total + board.lists.length, 0);
    });

    readonly tasksCount = computed(() => {
        return this.boards().reduce((total, board) => {
            return total + board.lists.reduce((listTotal, list) => listTotal + list.tasks.length, 0);
        }, 0);
    });
}
