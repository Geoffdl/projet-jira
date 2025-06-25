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

    <div class="p-2" cdkDrag>
      <div class="du-mockup-code bg-primary/70  text-primary-content hover:bg-accent-content hover:text-accent"
           (contextmenu)="handleClick($event)">
        <pre data-prefix="ttl"><code class="font-extrabold">{{ task().title }}</code></pre>
        <pre data-prefix="dsc"><code class="font-extrabold">{{ task().description }}</code></pre>
        <pre data-prefix="tag"><code class="font-extrabold">{{ task().tag }}</code></pre>
      </div>
    </div>

    <app-modal-component (openModal)="openModal()" [modalId]="modalId()">
    <button (click)="requestDelete()" class=" du-btn du-btn-outline text-warning hover:text-red-500">delete</button>
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
