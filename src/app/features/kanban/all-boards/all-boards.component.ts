import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalService } from '../../../../shared/services/modal.service';
import { BoardModel } from '../../../../shared/types/board.types';
import { BOARD_FORM_CONFIG } from '../../../../shared/utils/form.config';
import { BoardActions } from '../../../store/board.actions';
import { selectBoards } from '../../../store/board.selectors';
import { SvgAddIconComponent } from '../../../../shared/components/svg-add-icon/svg-add-icon.component';
import { SimpleModalComponent } from '../../../../shared/components/simple-modal/simple-modal.component';
import { UnifiedFormComponent } from '../../../../shared/components/unified-form/unified-form.component';
import { BoardComponent } from '../board/board.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-all-boards',
    imports: [SvgAddIconComponent, SimpleModalComponent, UnifiedFormComponent, BoardComponent, RouterOutlet],
    template: `
        <header class="pb-6">
            <h1 class="text-primary hover:text-accent text-4xl font-bold transition-colors duration-200">Dashboard</h1>
        </header>

        <div class="mb-6 flex justify-end">
            <button (click)="openNewBoardModal()" class="du-btn du-btn-primary du-btn-sm gap-2 shadow-md transition-shadow hover:shadow-lg">
                <app-svg-add-icon />
                New board
            </button>
        </div>

        <!-- Boards List -->
        <div class="space-y-6">
            @for (board of boards(); track board.id) {
                @if (!$first) {
                    <div class="du-divider du-divider-accent/40"></div>
                }
                <app-board [boardId]="board.id" />
            } @empty {
                <div class="py-8 text-center">
                    <p class="text-base-content/60 italic">No boards yet!</p>
                </div>
            }
        </div>

        <!-- New Board Modal -->
        <app-simple-modal (openModal)="openNewBoardModal()" [modalId]="newBoardModalId">
            <app-unified-form [config]="boardFormConfig" (formSubmit)="handleNewBoard($event)" />
        </app-simple-modal>

        <router-outlet />
    `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})

/**
 * Dashboard view that contains all the boards > lists > tasks of the app. It is implemented into the home page.
 */
export class AllBoardsComponent {
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
