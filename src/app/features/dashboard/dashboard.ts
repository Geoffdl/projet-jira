import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { BoardComponent } from './board-component/board-component';
import { BoardModel } from './dashboard-models/board-model';
import { ModalComponent } from '../../shared/modal-component/modal-component';
import { FormBoardComponent } from './form-board-component/form-board-component';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectBoards } from '../../store/board-selectors';
import { BoardActions } from '../../store/board-actions';
import { ModalService } from '../../shared/services/modal.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [BoardComponent, ModalComponent, FormBoardComponent, RouterOutlet],
})
export class Dashboard {
    private readonly store = inject(Store);
    private readonly modalService = inject(ModalService);

    readonly boards = computed(() => {
        return this.store.selectSignal(selectBoards)() ?? [];
    });

    readonly newBoardModalId = 'modal-new-board';

    openNewBoardModal(): void {
        this.modalService.openModal(this.newBoardModalId);
    }

    handleNewBoard(boardData: { title: string }): void {
        const newBoard: BoardModel = {
            id: Date.now(),
            title: boardData.title,
            lists: [],
        };

        this.store.dispatch(
            BoardActions.addBoard({
                board: newBoard,
            }),
        );

        this.modalService.closeModal(this.newBoardModalId);
    }
}
