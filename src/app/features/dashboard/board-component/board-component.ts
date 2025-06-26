import { Component, computed, inject, input, ChangeDetectionStrategy } from '@angular/core';
import { ListComponent } from '../list-component/list-component';
import { ModalComponent } from '../../../shared/components/modal-component/modal-component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectBoardById } from '../../../store/board-selectors';
import { BoardActions } from '../../../store/board-actions';
import { ModalService } from '../../../shared/services/modal.service';
import { ListModel } from '../../../shared/types/board-types';
import { UnifiedFormComponent } from '../../../shared/components/unified-form/unified-form.component';
import { BoardEditFormResult, ListFormResult } from '../../../shared/types/form-types';
import { BOARD_FORM_CONFIG, LIST_FORM_CONFIG } from '../../../shared/utils/form-configs';
import { ClickActionComponent } from '../../../shared/components/click-action-component/click-action-component';
import { DeleteElementConfirmComponent } from '../../../shared/components/delete-element-confirm/delete-element-confirm';

@Component({
    selector: 'app-board-component',
    templateUrl: './board-component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ListComponent, ModalComponent, UnifiedFormComponent, ClickActionComponent, DeleteElementConfirmComponent],
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
    readonly deleteModalId = computed(() => `modal-delete-board-${this.boardId()}`);
    readonly boardFormConfig = BOARD_FORM_CONFIG;
    readonly listFormConfig = LIST_FORM_CONFIG;

    openNewListModal(): void {
        this.modalService.openModal(this.newListModalId());
    }

    openEditModal(): void {
        this.modalService.openModal(this.editModalId());
    }

    openDeleteModal(): void {
        this.modalService.openModal(this.deleteModalId());
    }

    handleDelete(): void {
        this.store.dispatch(BoardActions.deleteBoard({ boardId: this.boardId() }));
        this.modalService.closeModal(this.deleteModalId());
    }

    handleNewList(formData: Record<string, any>): void {
        const listData = formData as ListFormResult;
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

    handleBoardUpdate(formData: Record<string, any>): void {
        const boardData = formData as BoardEditFormResult;
        this.store.dispatch(
            BoardActions.updateBoardTitle({
                boardId: this.boardId(),
                newTitle: boardData.title,
            }),
        );

        this.modalService.closeModal(this.editModalId());
    }

    navigateToBoardDetails(): void {
        this.router.navigate(['/board', this.boardId()]);
    }
}
