import { Component, computed, inject, input, output, ChangeDetectionStrategy } from '@angular/core';
import { ModalComponent } from '../../../shared/components/modal-component/modal-component';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { selectTaskById } from '../../../store/board-selectors';
import { BoardActions } from '../../../store/board-actions';
import { ModalService } from '../../../shared/services/modal.service';
import { UnifiedFormComponent } from '../../../shared/components/unified-form/unified-form.component';
import { TASK_FORM_CONFIG } from '../../../shared/utils/form-configs';
import { TaskEditFormResult } from '../../../shared/types/form-types';
import { TaskModel } from '../../../shared/types/board-types';
import { DeleteElementConfirmComponent } from '../../../shared/components/delete-element-confirm/delete-element-confirm';
import { ClickActionComponent } from '../../../shared/components/click-action-component/click-action-component';

@Component({
    selector: 'app-task-component',
    templateUrl: './task-component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ModalComponent, CdkDrag, UnifiedFormComponent, DeleteElementConfirmComponent, ClickActionComponent],
})
export class TaskComponent {
    private readonly store = inject(Store);
    private readonly modalService = inject(ModalService);

    taskId = input.required<number>();
    deleteTask = output<void>();

    readonly task = computed(() => {
        return this.store.selectSignal(selectTaskById(this.taskId()))() ?? null;
    });

    readonly taskFormConfig = TASK_FORM_CONFIG;
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

    handleTaskUpdate(formData: Record<string, any>): void {
        const taskData = formData as TaskEditFormResult;
        const updatedTask: TaskModel = {
            id: taskData.id,
            title: taskData.title,
            description: taskData.description,
            tag: taskData.tag,
        };
        this.store.dispatch(
            BoardActions.updateTask({
                task: updatedTask,
            }),
        );
        this.modalService.closeModal(this.editModalId());
    }
}
