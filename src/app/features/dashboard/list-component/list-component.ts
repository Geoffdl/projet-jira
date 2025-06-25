import { Component, computed, inject, input, model, output, signal } from '@angular/core';
import { TaskComponent } from '../task-component/task-component';
import { TaskModel } from '../dashboard-models/task-model';
import { ListModel } from '../dashboard-models/list-model';
import { BoardDataService } from '../board-data-service/board-data-service';
import { ModalComponent } from '../../../shared/modal-component/modal-component';
import { FormTaskComponent } from '../form-task-component/form-task-component';
import { EmptyTaskComponent } from "../../../shared/empty-task-component/empty-task-component";
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list-component',
  imports: [
    TaskComponent,
    ModalComponent,
    FormTaskComponent,
    EmptyTaskComponent,
    DragDropModule
],
  template: `
<div class="bg-base-300 rounded-xl p-4 shadow-md space-y-4 h-fit">
  <h2 class="font-bold text-lg text-secondary flex items-center">
    {{ list().title }}
  </h2>

  <button (click)="openModal()" class="du-btn du-btn-sm du-btn-outline du-btn-accent gap-2 w-full">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
    </svg>
    New task
  </button>

  <app-modal-component (openModal)="openModal()" [modalId]="modalId()">
    <app-form-task-component (formResult)="handleFormResult($event)"></app-form-task-component>
  </app-modal-component>

  <div class="space-y-3"   cdkDropList
   [id]="getDropListId(list().id)"
  [cdkDropListData]="list().tasks"
  [cdkDropListConnectedTo]="connectedDropLists"
  (cdkDropListDropped)="onDrop($event)">
    @for (task of list().tasks; track task.id) {
      <app-task-component [task]="task" class="m-1 " ></app-task-component>
    } @empty {
      <div class="text-center py-6">
        <app-empty-task-component></app-empty-task-component>
        <p class="text-base-content/60 text-sm italic mt-2">No tasks in {{ list().title }}</p>
      </div>
    }
  </div>
</div>
  `,
  styles: ``
})
export class ListComponent {
  private boardService = inject(BoardDataService);

  boardId = input.required<number>();
  list = input.required<ListModel>();

  connectedDropLists: string[] = [];

  ngOnInit() {
    this.connectedDropLists = this.boardService
      .boards()
      .find(b => b.id === this.boardId())?.lists.map(l => this.getDropListId(l.id)) ?? [];
  }

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
      tag
    };
    this.boardService.addTaskToList(this.boardId(), this.list().id, newTask);
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
      this.boardService.reorderTasksInList(
        this.boardId(),
        this.list().id,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const movedTask = event.previousContainer.data[event.previousIndex];
      const fromListId = this.extractListId(event.previousContainer.id);
      const toListId = this.extractListId(event.container.id);

      this.boardService.moveTaskBetweenLists(
        this.boardId(),
        fromListId,
        toListId,
        movedTask,
        event.currentIndex
      );
    }
  }

  extractListId(dropListId: string): number {
    // "list-0" => 0
    return Number(dropListId.replace('list-', ''));
  }
}
