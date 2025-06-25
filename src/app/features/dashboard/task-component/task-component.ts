import { Component, computed, inject, input, model, output } from '@angular/core';
import { TaskModel } from '../dashboard-models/task-model';
import { BoardDataService } from '../board-data-service/board-data-service';
import { ModalComponent } from '../../../shared/modal-component/modal-component';

@Component({
  selector: 'app-task-component',
  imports: [
    ModalComponent
  ],
  template: `

    <div class="p-2">
      <div class="du-mockup-code bg-primary/70  text-primary-content hover:bg-accent-content hover:text-accent"
           (click)="handleClick()">
        <pre data-prefix="ttl"><code class="font-extrabold">{{ task().title }}</code></pre>
        <pre data-prefix="dsc"><code class="font-extrabold">{{ task().description }}</code></pre>
        <pre data-prefix="tag"><code class="font-extrabold">{{ task().tag }}</code></pre>
      </div>
    </div>

    <app-modal-component (openModal)="openModal()" [modalId]="modalId()">
    <p (click)="requestDelete()">yes</p>
      <p> no</p>
    </app-modal-component>
  `,
  styles: ``
})
export class TaskComponent {
  private boardService = inject(BoardDataService);

  task = input.required<TaskModel>();
  modalId = computed(() => `modal-task-${this.task().id}`);

  deleteTask = output();
  handleClick() {
    this.openModal()
  }
  requestDelete(){
    const taskId = this.task().id;
    this.boardService.deleteTask(taskId);
    const dialog = (document.getElementById(this.modalId()) as HTMLDialogElement);
    dialog.close();
  }

  openModal() {
    const dialog = (document.getElementById(this.modalId()) as HTMLDialogElement);
    dialog.showModal();
  }
}
