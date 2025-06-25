import { Component, computed, inject, input, model, output } from '@angular/core';
import { TaskModel } from '../dashboard-models/task-model';
import { BoardDataService } from '../board-data-service/board-data-service';
import { ModalComponent } from '../../../shared/modal-component/modal-component';
import {CdkDrag} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-component',
  imports: [
    ModalComponent,CdkDrag
  ],
  template: `

<div class="group" cdkDrag>
  <div class="du-mockup-code bg-primary/90 text-primary-content hover:bg-accent hover:text-accent-content p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-grab active:cursor-grabbing"
       (contextmenu)="handleClick($event)">
    <pre data-prefix="ttl"><code class="font-bold text-sm">{{ task().title }}</code></pre>
    <pre data-prefix="dsc"><code class="text-sm opacity-90">{{ task().description }}</code></pre>
    <pre data-prefix="tag"><code class="text-xs"><span class="du-badge du-badge-accent du-badge-sm">{{ task().tag }}</span></code></pre>
  </div>
</div>

<app-modal-component (openModal)="openModal()" [modalId]="modalId()">
  <div class="flex flex-col gap-4">
    <h3 class="text-lg font-semibold">Task Actions</h3>
    <button (click)="requestDelete()" class="du-btn du-btn-outline du-btn-error gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
      </svg>
      Delete Task
    </button>
  </div>
</app-modal-component>
  `,
  styles: ``
})
export class TaskComponent {
  private boardService = inject(BoardDataService);

  task = input.required<TaskModel>();
  modalId = computed(() => `modal-task-${this.task().id}`);

  deleteTask = output();
  handleClick(event: MouseEvent) {
    event.preventDefault();
    this.openModal()
  }
  requestDelete(){
    const taskId = this.task().id;
    this.boardService.deleteTask(taskId);
    this.closeModal;
  }
  closeModal(){
    const dialog = (document.getElementById(this.modalId()) as HTMLDialogElement);
    dialog.close();
  }
  openModal() {
    const dialog = (document.getElementById(this.modalId()) as HTMLDialogElement);
    dialog.showModal();
  }
}
