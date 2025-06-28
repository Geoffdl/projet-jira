import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ClickActionComponent } from '../../../../shared/components/click-action/click-action.component';
import { DeleteElementConfirmComponent } from '../../../../shared/components/delete-element-confirm/delete-element-confirm.component';
import { UnifiedFormComponent } from '../../../../shared/components/unified-form/unified-form.component';
import { ModalService } from '../../../../shared/services/modal.service';
import { BoardModel, ListModel } from '../../../../shared/types/board.types';
import { ListFormResult, BoardEditFormResult } from '../../../../shared/types/form.types';
import { BOARD_FORM_CONFIG, LIST_FORM_CONFIG } from '../../../../shared/utils/form.config';
import { BoardActions } from '../../../store/board.actions';
import { selectBoardById } from '../../../store/board.selectors';
import { ListComponent } from '../list/list.component';
import { SimpleModalComponent } from '../../../../shared/components/simple-modal/simple-modal.component';
import { SvgAddIconComponent } from '../../../../assets/svgs/svg-add-icon.component';

@Component({
    selector: 'app-board',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ListComponent,
        SimpleModalComponent,
        UnifiedFormComponent,
        ClickActionComponent,
        DeleteElementConfirmComponent,
        SvgAddIconComponent,
        SimpleModalComponent,
        SvgAddIconComponent,
    ],
    template: `
        @if (filteredBoard(); as currentBoard) {
            <div class="bg-base-200 space-y-6 rounded-xl p-6 shadow-md">
                <header class="flex items-center justify-between">
                    <app-click-action (doubleClick)="openEditModal()" (rightClick)="openDeleteModal()">
                        <div class="flex items-center gap-2">
                            <h1
                                (click)="navigateToBoardDetails()"
                                class="text-base-content hover:text-secondary text-2xl font-semibold transition-colors hover:cursor-pointer"
                            >
                                {{ currentBoard.title }}
                            </h1>
                            @if (hasActiveFilters()) {
                                <span class="du-badge du-badge-warning du-badge-sm">Filtered</span>
                            }
                        </div>
                    </app-click-action>

                    <button (click)="openNewListModal()" class="du-btn du-btn-secondary du-btn-sm text-secondary-content gap-2">
                        <app-svg-add-icon />
                        New list
                    </button>
                </header>

                <!-- Lists Container -->
                @if (fullWidth()) {
                    <!-- Full width grid layout for detail page -->
                    <div class="auto-fit-minmax grid gap-6">
                        @for (list of currentBoard.lists; track list.id) {
                            <div class="w-full">
                                <app-list [boardId]="boardId()" [listId]="list.id" [filteredTasks]="list.tasks" />
                            </div>
                        } @empty {
                            <div class="col-span-full py-12 text-center">
                                @if (hasActiveFilters()) {
                                    <p class="text-base-content/60 italic">No tasks match the selected filters</p>
                                } @else {
                                    <p class="text-base-content/60 italic">No lists yet in {{ currentBoard.title }}</p>
                                }
                            </div>
                        }
                    </div>
                } @else {
                    <!-- Horizontal scrolling layout for overview -->
                    <div class="flex gap-6 overflow-x-auto pb-4">
                        @for (list of currentBoard.lists; track list.id) {
                            <div class="min-w-80 flex-shrink-0">
                                <app-list [boardId]="boardId()" [listId]="list.id" [filteredTasks]="list.tasks" />
                            </div>
                            @if (!$last) {
                                <div class="du-divider du-divider-horizontal opacity-30"></div>
                            }
                        } @empty {
                            <div class="flex-1 py-12 text-center">
                                @if (hasActiveFilters()) {
                                    <p class="text-base-content/60 italic">No tasks match the selected filters</p>
                                } @else {
                                    <p class="text-base-content/60 italic">No lists yet in {{ currentBoard.title }}</p>
                                }
                            </div>
                        }
                    </div>
                }
            </div>

            <!-- New List Modal -->
            <app-simple-modal [modalId]="newListModalId()" (openModal)="openNewListModal()">
                <app-unified-form [config]="listFormConfig" (formSubmit)="handleNewList($event)" />
            </app-simple-modal>
            <!-- Edit Board Modal -->
            <app-simple-modal [modalId]="editModalId()">
                <app-unified-form [config]="boardFormConfig" [data]="originalBoard() || undefined" (formSubmit)="handleBoardUpdate($event)" />
            </app-simple-modal>
            <!-- Delete Board Modal -->
            <app-simple-modal [modalId]="deleteModalId()" (openModal)="openDeleteModal()">
                <app-delete-element-confirm [title]="'Board actions'" [buttonText]="'Delete board'" (confirmDelete)="handleDelete()" />
            </app-simple-modal>
        } @else {
            <div class="py-12 text-center">
                <p class="text-base-content/60 italic">Board not found</p>
            </div>
        }
    `,
    styles: `
        .auto-fit-minmax {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        }
    `,
})
export class BoardComponent {
    private readonly router = inject(Router);
    private readonly store = inject(Store);
    private readonly modalService = inject(ModalService);

    boardId = input<number>(1);
    fullWidth = input<boolean>(false);
    tagFilters = input<string[]>([]);

    readonly originalBoard = computed(() => {
        return this.store.selectSignal(selectBoardById(this.boardId()))() ?? null;
    });

    readonly filteredBoard = computed(() => {
        const board = this.originalBoard();
        if (!board) return null;

        const filters = this.tagFilters();
        if (filters.length === 0) return board;

        // Create a filtered version of the board
        const filteredBoard: BoardModel = {
            ...board,
            lists: board.lists.map((list) => ({
                ...list,
                tasks: list.tasks.filter((task) => filters.includes(task.tag)),
            })),
        };

        return filteredBoard;
    });

    readonly newListModalId = computed(() => `modal-new-list-${this.boardId()}`);
    readonly editModalId = computed(() => `modal-edit-board-${this.boardId()}`);
    readonly deleteModalId = computed(() => `modal-delete-board-${this.boardId()}`);
    readonly boardFormConfig = BOARD_FORM_CONFIG;
    readonly listFormConfig = LIST_FORM_CONFIG;

    hasActiveFilters(): boolean {
        return this.tagFilters().length > 0;
    }

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
