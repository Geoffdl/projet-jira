import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { BoardComponent } from './board-component/board-component';
import { ModalComponent } from '../../shared/components/modal-component/modal-component';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectBoards } from '../../store/board-selectors';
import { BoardActions } from '../../store/board-actions';
import { UnifiedFormComponent } from '../../shared/components/unified-form/unified-form.component';
import { BoardModel } from '../../shared/types/board-types';
import { BOARD_FORM_CONFIG } from '../../shared/utils/form-configs';
import { ModalService } from '../../shared/services/modal.service';
import { SvgAddIcon } from '../../shared/components/svg-add-icon/svg-add-icon';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [BoardComponent, ModalComponent, RouterOutlet, UnifiedFormComponent, SvgAddIcon],
})
/**
 * Dashboard view that contains all the boards > lists > tasks of the app. It is implemented into the home page.
 */
export class Dashboard {
    /**
     * Ngrx impl
     */
    private readonly store = inject(Store);
    /**
     * Modal service
     */
    private readonly modalService = inject(ModalService);

    readonly boards = computed(() => {
        return this.store.selectSignal(selectBoards)() ?? [];
    });

    readonly newBoardModalId = 'modal-new-board';
    readonly boardFormConfig = BOARD_FORM_CONFIG;

    openNewBoardModal(): void {
        this.modalService.openModal(this.newBoardModalId);
    }

    handleNewBoard(formResult: Record<string, any>): void {
        const boardData = formResult as BoardModel;

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
