import { Component, computed, inject, input, output, ChangeDetectionStrategy } from '@angular/core';
import { TaskModel } from '../dashboard-models/task-model';
import { ModalComponent } from '../../../shared/modal-component/modal-component';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { FormEditTaskComponent } from '../form-task-component/form-edit-task-component';
import { Store } from '@ngrx/store';
import { selectTaskById } from '../../../store/board-selectors';
import { BoardActions } from '../../../store/board-actions';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
    selector: 'app-task-component',
    templateUrl: './task-component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ModalComponent, CdkDrag, FormEditTaskComponent],
})
export class TaskComponent {
    private readonly store = inject(Store);
    private readonly modalService = inject(ModalService);

    taskId = input.required<number>();
    deleteTask = output<void>();

    readonly task = computed(() => {
        return this.store.selectSignal(selectTaskById(this.taskId()))() ?? null;
    });

    readonly actionsModalId = computed(() => `modal-task-actions-${this.taskId()}`);
    readonly editModalId = computed(() => `modal-task-edit-${this.taskId()}`);

    handleRightClick(event: MouseEvent): void {
        event.preventDefault();
        this.openActionsModal();
    }

    openActionsModal(): void {
        this.modalService.openModal(this.actionsModalId());
    }

    openEditModal(): void {
        this.modalService.openModal(this.editModalId());
    }

    handleDelete(): void {
        this.store.dispatch(BoardActions.deleteTask({ taskId: this.taskId() }));
        this.modalService.closeModal(this.actionsModalId());
    }

    handleTaskUpdate(updatedTask: TaskModel): void {
        this.store.dispatch(BoardActions.updateTask({ task: updatedTask }));
        this.modalService.closeModal(this.editModalId());
    }
}
