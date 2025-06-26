import { Component, computed, inject, input, ChangeDetectionStrategy } from '@angular/core';
import { ListComponent } from '../list-component/list-component';
import { ListModel } from '../dashboard-models/list-model';
import { ModalComponent } from '../../../shared/modal-component/modal-component';
import { FormListComponent } from '../form-list-component/form-list-component';
import { Router } from '@angular/router';
import { FormEditBoardComponent } from '../form-board-component/form-edit-board-component';
import { BoardModel } from '../dashboard-models/board-model';
import { Store } from '@ngrx/store';
import { selectBoardById } from '../../../store/board-selectors';
import { BoardActions } from '../../../store/board-actions';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
    selector: 'app-board-component',
    templateUrl: './board-component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ListComponent, ModalComponent, FormListComponent, FormEditBoardComponent],
})
export class BoardComponent {
    private readonly router = inject(Router);
    private readonly store = inject(Store);
    private readonly modalService = inject(ModalService);

    boardId = input<number>(1);

    readonly board = computed(() => {
        return this.store.selectSignal(selectBoardById(this.boardId()))() ?? null;
    });

    readonly newListModalId = computed(() => `modal-new-list-${this.boardId()}`);
    readonly editModalId = computed(() => `modal-edit-board-${this.boardId()}`);

    openNewListModal(): void {
        this.modalService.openModal(this.newListModalId());
    }

    openEditModal(): void {
        this.modalService.openModal(this.editModalId());
    }

    handleNewList(listData: { title: string }): void {
        const newList: ListModel = {
            id: Date.now(),
            title: listData.title,
            tasks: [],
        };

        this.store.dispatch(
            BoardActions.addListToBoard({
                boardId: this.boardId(),
                list: newList,
            }),
        );

        this.modalService.closeModal(this.newListModalId());
    }

    handleBoardUpdate(updatedBoard: BoardModel): void {
        this.store.dispatch(
            BoardActions.updateBoardTitle({
                boardId: updatedBoard.id,
                newTitle: updatedBoard.title,
            }),
        );

        this.modalService.closeModal(this.editModalId());
    }

    navigateToBoardDetails(): void {
        this.router.navigate(['/board', this.boardId()]);
    }
}
