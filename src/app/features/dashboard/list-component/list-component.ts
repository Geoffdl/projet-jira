import { Component, computed, inject, input, ChangeDetectionStrategy } from '@angular/core';
import { TaskComponent } from '../task-component/task-component';
import { TaskModel } from '../dashboard-models/task-model';
import { ListModel } from '../dashboard-models/list-model';
import { ModalComponent } from '../../../shared/modal-component/modal-component';
import { FormTaskComponent } from '../form-task-component/form-task-component';
import { EmptyTaskComponent } from '../../../shared/empty-task-component/empty-task-component';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { FormEditListComponent } from '../form-list-component/form-edit-list-component';
import { Store } from '@ngrx/store';
import { selectListById, selectListsOfBoard } from '../../../store/board-selectors';
import { BoardActions } from '../../../store/board-actions';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
    selector: 'app-list-component',
    templateUrl: './list-component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TaskComponent, ModalComponent, FormTaskComponent, EmptyTaskComponent, DragDropModule, FormEditListComponent],
})
export class ListComponent {
    private readonly store = inject(Store);
    private readonly modalService = inject(ModalService);

    listId = input.required<number>();
    boardId = input.required<number>();

    readonly list = computed(() => {
        return this.store.selectSignal(selectListById(this.listId()))() ?? null;
    });

    readonly listsOfBoard = computed(() => {
        return this.store.selectSignal(selectListsOfBoard(this.boardId()))() ?? [];
    });

    readonly dropListId = computed(() => `list-${this.listId()}`);

    readonly connectedDropLists = computed(() => {
        const lists = this.listsOfBoard();
        const ownId = this.dropListId();
        return lists.map((list) => `list-${list.id}`).filter((id) => id !== ownId);
    });

    readonly newTaskModalId = computed(() => `modal-new-task-${this.listId()}`);
    readonly editModalId = computed(() => `modal-edit-list-${this.listId()}`);

    openNewTaskModal(): void {
        this.modalService.openModal(this.newTaskModalId());
    }

    openEditModal(): void {
        this.modalService.openModal(this.editModalId());
    }

    handleNewTask(taskData: { title: string; description: string; tag: string }): void {
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

    handleListUpdate(updatedList: ListModel): void {
        this.store.dispatch(
            BoardActions.updateListTitle({
                boardId: this.boardId(),
                listId: this.listId(),
                newTitle: updatedList.title,
            }),
        );

        this.modalService.closeModal(this.editModalId());
    }

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
