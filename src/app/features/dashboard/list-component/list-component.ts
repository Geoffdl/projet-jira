import { Component, computed, input, signal } from '@angular/core';
import { TaskComponent } from '../task-component/task-component';
import { TaskModel } from '../dashboard-models/task-model';

@Component({
  selector: 'app-list-component',
  imports: [
    TaskComponent
  ],
  template: `
    <p class="text-lg text-secondary"> List : {{title()}}</p>
    <button (click)="addNewTask()" class="du-btn du-btn-outline du-btn-sm du-btn-accent">
      Create a new task
    </button>
    @if(isListEmpty()){
      <p>No task currently in {{title()}}</p>
    }
    @for (task of taskList(); track $index) {
      <p>"Task :xx "</p>
      <app-task-component [title]=task.title [description]=task.description [tag]=task.tag></app-task-component>

    }
  `,
  styles: ``
})
export class ListComponent {
  title = input.required<string>();
  taskList = input<TaskModel[]>([]);
  isListEmpty = computed(() => this.taskList.length === 0);

  addNewTask() {

  }
}
