import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClickActionComponent } from '../../../../shared/components/click-action/click-action.component';
import { DeleteElementConfirmComponent } from '../../../../shared/components/delete-element-confirm/delete-element-confirm.component';
import { UnifiedFormComponent } from '../../../../shared/components/unified-form/unified-form.component';
import { ModalService } from '../../../../shared/services/modal.service';
import { TaskModel } from '../../../../shared/types/board.types';
import { TaskEditFormResult } from '../../../../shared/types/form.types';
import { TASK_FORM_CONFIG } from '../../../../shared/utils/form.config';
import { BoardActions } from '../../../store/board.actions';
import { selectTaskById } from '../../../store/board.selectors';
import { SimpleModalComponent } from '../../../../shared/components/simple-modal/simple-modal.component';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-task',
    template: `
        @if (task(); as currentTask) {
            <div class="group" cdkDrag [cdkDragData]="currentTask">
                <app-click-action class="cursor-grab active:cursor-grabbing" (rightClick)="handleRightClick()" (doubleClick)="openEditModal()">
                    <div
                        class="du-mockup-code bg-primary/90 text-primary-content hover:bg-accent hover:text-accent-content cursor-grab rounded-lg p-3 shadow-md transition-all duration-300 hover:shadow-lg active:cursor-grabbing"
                    >
                        <pre data-prefix="ttl"><code class="font-bold text-sm">{{ currentTask.title }}</code></pre>
                        <pre data-prefix="dsc"><code class="text-sm opacity-90">{{ currentTask.description }}</code></pre>
                        <pre
                            data-prefix="tag"
                        ><code class="text-xs"><span class="du-badge du-badge-accent du-badge-sm">{{ currentTask.tag }}</span></code></pre>
                    </div>
                </app-click-action>
            </div>

            <!-- Actions Modal -->
            <app-simple-modal [modalId]="actionsModalId()" (openModal)="openActionsModal()">
                <app-delete-element-confirm [title]="'Task Actions'" [buttonText]="'Delete Task'" (confirmDelete)="handleDelete()" />
            </app-simple-modal>
            <!-- Edit Modal -->
            <app-simple-modal [modalId]="editModalId()" (openModal)="openEditModal()">
                <app-unified-form [config]="taskFormConfig" [data]="currentTask" (formSubmit)="handleTaskUpdate($event)" />
            </app-simple-modal>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SimpleModalComponent, CdkDrag, UnifiedFormComponent, DeleteElementConfirmComponent, ClickActionComponent],
})
/**
 * Task component
 * @param taskId id to find the corresponding task in the store
 * @outpud deleteTask
 */
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

    handleRightClick(): void {
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
