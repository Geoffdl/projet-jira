import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClickActionComponent } from '../../../../shared/components/click-action/click-action.component';
import { DeleteElementConfirmComponent } from '../../../../shared/components/delete-element-confirm/delete-element-confirm.component';
import { EmptyTaskComponent } from '../../../../shared/components/empty-task/empty-task.component';
import { UnifiedFormComponent } from '../../../../shared/components/unified-form/unified-form.component';
import { ModalService } from '../../../../shared/services/modal.service';
import { TaskModel } from '../../../../shared/types/board.types';
import { TaskFormResult, ListEditFormResult } from '../../../../shared/types/form.types';
import { TASK_FORM_CONFIG, LIST_FORM_CONFIG } from '../../../../shared/utils/form.config';
import { BoardActions } from '../../../store/board.actions';
import { selectListById, selectListsOfBoard } from '../../../store/board.selectors';
import { TaskComponent } from '../task/task.component';
import { SimpleModalComponent } from '../../../../shared/components/simple-modal/simple-modal.component';
import { SvgAddIconComponent } from '../../../../shared/components/svg-add-icon/svg-add-icon.component';

@Component({
    selector: 'app-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TaskComponent,
        SimpleModalComponent,
        UnifiedFormComponent,
        EmptyTaskComponent,
        DragDropModule,
        ClickActionComponent,
        DeleteElementConfirmComponent,
        SvgAddIconComponent,
    ],
    template: `
        @if (list(); as currentList) {
            <div class="bg-base-300 h-fit space-y-4 rounded-xl p-4 shadow-md">
                <app-click-action (rightClick)="handleRightClick()" (doubleClick)="openEditModal()">
                    <h2 class="text-secondary mb-3 flex-1 text-center text-lg font-bold">{{ currentList.title }}</h2>
                </app-click-action>

                <button (click)="openNewTaskModal()" class="du-btn du-btn-sm du-btn-outline du-btn-accent w-full gap-2">
                    <app-svg-add-icon />
                    New task
                </button>

                <!-- Tasks Container -->
                <div
                    class="space-y-3"
                    cdkDropList
                    [id]="dropListId()"
                    [cdkDropListData]="currentList.tasks"
                    [cdkDropListConnectedTo]="connectedDropLists()"
                    (cdkDropListDropped)="handleDrop($event)"
                >
                    @for (task of currentList.tasks; track task.id) {
                        <app-task [taskId]="task.id" class="m-1" />
                    } @empty {
                        <div class="py-6 text-center">
                            <app-empty-task />
                            <p class="text-base-content/60 mt-2 text-sm italic">No tasks in {{ currentList.title }}</p>
                        </div>
                    }
                </div>
            </div>

            <!-- New Task Modal -->
            <app-simple-modal [modalId]="newTaskModalId()" (openModal)="openNewTaskModal()">
                <app-unified-form [config]="taskFormConfig" (formSubmit)="handleNewTask($event)" />
            </app-simple-modal>
            <!-- Edit List Modal -->
            <app-simple-modal [modalId]="editModalId()">
                <app-unified-form [config]="listFormConfig" [data]="currentList" (formSubmit)="handleListUpdate($event)" />
            </app-simple-modal>
            <!-- Delete List Modal -->
            <app-simple-modal [modalId]="deleteModalId()" (openModal)="openDeleteModal()">
                <app-delete-element-confirm [title]="'List actions'" [buttonText]="'Delete list'" (confirmDelete)="handleDelete()" />
            </app-simple-modal>
        }
    `,
})
/**
 * Handles the display of a list with its tasks. Has access to the store for fetching the data and creationg, edition, deletion operations
 * Second main component of this app.
 */
export class ListComponent {
    /**
     * ngrx store implementation
     */
    private readonly store = inject(Store);
    /**
     * Modal service
     */
    private readonly modalService = inject(ModalService);

    readonly listId = input.required<number>();
    readonly boardId = input.required<number>();

    /**
     * Fetches list by id from the store
     */
    readonly list = computed(() => {
        return this.store.selectSignal(selectListById(this.listId()))() ?? null;
    });
    /**
     * Fetches all related lists (within the same board)
     */
    readonly listsOfBoard = computed(() => {
        return this.store.selectSignal(selectListsOfBoard(this.boardId()))() ?? [];
    });

    /**
     * CDK Drag&Drop element (where the task is dropped)
     */
    readonly dropListId = computed(() => `list-${this.listId()}`);

    /**
     * All connected lists within the same board
     */
    readonly connectedDropLists = computed(() => {
        const lists = this.listsOfBoard();
        const ownId = this.dropListId();
        return lists.map((list) => `list-${list.id}`).filter((id) => id !== ownId);
    });

    // modal operations and form config
    readonly newTaskModalId = computed(() => `modal-new-task-${this.listId()}`);
    readonly editModalId = computed(() => `modal-edit-list-${this.listId()}`);
    readonly deleteModalId = computed(() => `modal-delete-list-${this.listId()}`);
    readonly taskFormConfig = TASK_FORM_CONFIG;
    readonly listFormConfig = LIST_FORM_CONFIG;

    /**
     * Opens task modal
     */
    openNewTaskModal(): void {
        this.modalService.openModal(this.newTaskModalId());
    }
    /**
     * Opens Edit modal
     */
    openEditModal(): void {
        this.modalService.openModal(this.editModalId());
    }
    openDeleteModal(): void {
        this.modalService.openModal(this.deleteModalId());
    }
    handleRightClick(): void {
        this.openDeleteModal();
    }
    handleDelete(): void {
        this.store.dispatch(BoardActions.deleteList({ boardId: this.boardId(), listId: this.listId() }));
    }
    /**
     * receives the form result and dispatches it to the store : creation
     * @param formData received data from creation form
     */
    handleNewTask(formData: Record<string, any>): void {
        const taskData = formData as TaskFormResult;

        const newTask: TaskModel = {
            id: Date.now(),
            title: taskData.title,
            description: taskData.description,
            tag: taskData.tag,
        };

        this.store.dispatch(
            BoardActions.addTaskToList({
                boardId: this.boardId(),
                listId: this.listId(),
                task: newTask,
            }),
        );

        this.modalService.closeModal(this.newTaskModalId());
    }
    /**
     * receives the form result and dispatches it to the store : update
     * @param updatedList updated list(title)
     */
    handleListUpdate(formData: Record<string, any>): void {
        const listData = formData as ListEditFormResult;

        this.store.dispatch(
            BoardActions.updateListTitle({
                boardId: this.boardId(),
                listId: this.listId(),
                newTitle: listData.title,
            }),
        );

        this.modalService.closeModal(this.editModalId());
    }

    /**
     * Handles the drop of a card into a list
     * @param event drop event
     */
    handleDrop(event: CdkDragDrop<TaskModel[]>): void {
        if (event.previousContainer === event.container) {
            // Reorder within same list
            this.store.dispatch(
                BoardActions.reorderTasks({
                    boardId: this.boardId(),
                    listId: this.listId(),
                    previousIndex: event.previousIndex,
                    currentIndex: event.currentIndex,
                }),
            );
        } else {
            // Move between lists
            const movedTask = event.previousContainer.data[event.previousIndex];
            const fromListId = this.extractListId(event.previousContainer.id);
            const toListId = this.extractListId(event.container.id);

            this.store.dispatch(
                BoardActions.moveTaskBetweenLists({
                    boardId: this.boardId(),
                    fromListId,
                    toListId,
                    task: movedTask,
                    toIndex: event.currentIndex,
                }),
            );
        }
    }

    private extractListId(dropListId: string): number {
        return Number(dropListId.replace('list-', ''));
    }
}
