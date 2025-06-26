import { Component, computed, inject, input, signal } from '@angular/core';
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

@Component({
    selector: 'app-list-component',
    imports: [TaskComponent, ModalComponent, FormTaskComponent, EmptyTaskComponent, DragDropModule, FormEditListComponent],
    template: `
        <div class="bg-base-300 h-fit space-y-4 rounded-xl p-4 shadow-md">
            <h2 class="text-secondary flex items-center gap-2 text-lg font-bold">
                {{ list().title }}
                <button (click)="openEditTitleModal()" class="du-btn du-btn-sm du-btn-ghost p-1" aria-label="Edit list title" title="Edit list title">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="15" height="15" fill="currentColor">
                        <path
                            d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                        />
                    </svg>
                </button>
            </h2>

            <button (click)="openModal()" class="du-btn du-btn-sm du-btn-outline du-btn-accent w-full gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                New task
            </button>

            <app-modal-component (openModal)="openModal()" [modalId]="modalId()">
                <app-form-task-component (formResult)="handleFormResult($event)"></app-form-task-component>
            </app-modal-component>

            <div
                class="space-y-3"
                cdkDropList
                [id]="getDropListId(list().id)"
                [cdkDropListData]="list().tasks"
                [cdkDropListConnectedTo]="connectedDropLists()"
                (cdkDropListDropped)="onDrop($event)"
            >
                @for (task of list().tasks; track task.id) {
                    <app-task-component [taskId]="task.id" class="m-1"></app-task-component>
                } @empty {
                    <div class="py-6 text-center">
                        <app-empty-task-component></app-empty-task-component>
                        <p class="text-base-content/60 mt-2 text-sm italic">No tasks in {{ list().title }}</p>
                    </div>
                }
            </div>
        </div>

        <app-modal-component [modalId]="editTitleModalId()">
            <app-form-edit-list [list]="list()" (listUpdated)="handleEditForm($event)"></app-form-edit-list>
        </app-modal-component>
    `,
    styles: ``,
})
export class ListComponent {
    private readonly store = inject(Store);

    listId = input.required<number>();

    readonly list = computed(() => {
        const result = this.store.selectSignal(selectListById(this.listId()))();
        if (!result) {
            throw new Error(`List with ID ${this.listId()} not found`);
        }
        return result;
    });

    boardId = input.required<number>();

    readonly listsOfBoard = computed(() => this.store.selectSignal(selectListsOfBoard(this.boardId()))());

    readonly connectedDropLists = computed(() => {
        const lists = this.listsOfBoard();
        if (!lists) return [];

        const ownId = this.getDropListId(this.listId());
        return lists.map((list) => this.getDropListId(list.id)).filter((id) => id !== ownId);
    });

    getDropListId(listId: number): string {
        return `list-${listId}`;
    }

    trackById(index: number, task: TaskModel) {
        return task.id;
    }

    addTask(title: string, description: string, tag: string) {
        const newTask: TaskModel = {
            id: Date.now(),
            title,
            description,
            tag,
        };
        this.store.dispatch(BoardActions.addTaskToList({ boardId: this.boardId(), listId: this.listId(), task: newTask }));
    }

    modalId = computed(() => `modal-list-${this.list().id}`);

    openModal() {
        const dialog = document.getElementById(this.modalId()) as HTMLDialogElement;
        dialog.showModal();
    }

    handleFormResult(event: any) {
        this.addTask(event.title, event.description, event.tag);
        const dialog = document.getElementById(this.modalId()) as HTMLDialogElement;
        dialog.close();
    }

    onDrop(event: CdkDragDrop<TaskModel[]>) {
        if (event.previousContainer === event.container) {
            this.store.dispatch(
                BoardActions.reorderTasks({
                    boardId: this.boardId(),
                    listId: this.list().id,
                    previousIndex: event.previousIndex,
                    currentIndex: event.currentIndex,
                }),
            );
        } else {
            const movedTask = event.previousContainer.data[event.previousIndex];
            const fromListId = this.extractListId(event.previousContainer.id);
            const toListId = this.extractListId(event.container.id);

            this.store.dispatch(
                BoardActions.moveTaskBetweenLists({
                    boardId: this.boardId(),
                    fromListId: fromListId,
                    toListId: toListId,
                    task: movedTask,
                    toIndex: event.currentIndex,
                }),
            );
        }
    }

    extractListId(dropListId: string): number {
        return Number(dropListId.replace('list-', ''));
    }

    //edit
    editTitle = signal('');
    editTitleModalId = computed(() => `modal-edit-title-list-${this.list().id}`);

    openEditTitleModal() {
        this.editTitle.set(this.list().title);
        const dialog = document.getElementById(this.editTitleModalId()) as HTMLDialogElement;
        dialog.showModal();
    }

    closeEditTitleModal() {
        const dialog = document.getElementById(this.editTitleModalId()) as HTMLDialogElement;
        dialog.close();
    }
    handleEditForm(updatedList: ListModel) {
        this.store.dispatch(
            BoardActions.updateListTitle({
                boardId: this.boardId(),
                listId: this.listId(),
                newTitle: updatedList.title,
            }),
        );
        this.closeEditTitleModal();
    }
}
