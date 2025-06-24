import { Component, computed, input, output, signal } from '@angular/core';
import { TaskComponent } from '../task-component/task-component';
import { TaskModel } from '../dashboard-models/task-model';

@Component({
  selector: 'app-list-component',
  imports: [
    TaskComponent
  ],
  template: `
    <p class="text-lg text-secondary font-medium">{{ title() }}</p>
    <button (click)="addNewTask()" class="du-btn du-btn-outline du-btn-sm du-btn-accent my-2">
      Create a new task
    </button>
    @if(isListEmpty()) {
      <p class="text-sm italic text-neutral-content">No task currently in {{ title() }}</p>
    }

    <div class="du-list bg-accent-content/30 rounded-box shadow-md">
      @for (task of taskList(); track $index) {
        <app-task-component [title]="task.title" [description]="task.description" [tag]="task.tag"></app-task-component>
      }
    </div>
  `,
  styles: ``
})
export class ListComponent {
  title = input.required<string>();
  taskList = input<TaskModel[]>([]);
  isListEmpty = computed(() => this.taskList().length === 0);

  newTaskEvent = output<string>();

  addNewTask() {
   this.newTaskEvent.emit(this.title());
  }
}
