import { Component, computed, inject, input, model, output, signal } from '@angular/core';
import { TaskComponent } from '../task-component/task-component';
import { TaskModel } from '../dashboard-models/task-model';
import { ListModel } from '../dashboard-models/list-model';
import { BoardDataService } from '../board-data-service/board-data-service';
import { ModalComponent } from '../../../shared/modal-component/modal-component';
import { FormTaskComponent } from '../form-task-component/form-task-component';

@Component({
  selector: 'app-list-component',
  imports: [
    TaskComponent,
    ModalComponent,

    FormTaskComponent
  ],
  template: `
    <h2 class="text-lg text-secondary font-medium">{{ list().title }}</h2>
    <button (click)="openModal()" class="du-btn du-btn-outline du-btn-sm du-btn-accent my-2">
      Create a new task
    </button>
    <app-modal-component (openModal)="openModal()" [modalId]="modalId()">
      <app-form-task-component (formResult)="handleFormResult($event)"></app-form-task-component>
    </app-modal-component>


    @for (task of list().tasks; track task.id) {
      <app-task-component [task]="task"></app-task-component>
    } @empty {
      <p class="text-sm italic text-neutral-content">No task currently in {{ list().title }}</p>
    }
  `,
  styles: ``
})
export class ListComponent {
  private boardService = inject(BoardDataService);

  boardId = input.required<number>();
  list = input.required<ListModel>();

  addTask(title: string, description: string, tag: string) {
    const newTask: TaskModel = {
       id: Date.now(),
       title,
       description,
      tag
    };
    this.boardService.addTaskToList(this.boardId(), this.list().id, newTask);
  }

  modalId = computed(() => `modal-list-${this.list().id}`);


    openModal() {
      const dialog = (document.getElementById(this.modalId()) as HTMLDialogElement);
      dialog.showModal();
    }
    handleFormResult(event: any) {

      this.addTask(event.title, event.description, event.tag);

      const dialog = (document.getElementById(this.modalId()) as HTMLDialogElement)
      dialog.close();
    }

}
