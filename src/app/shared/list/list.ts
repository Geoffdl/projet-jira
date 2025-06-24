import { Component, input, output } from '@angular/core';
import { Task } from '../task/task';
import { TaskData } from '../../features/dashboard/task-data';

@Component({
  selector: 'app-list',
  imports: [
    Task
  ],
  template: `
    <ul class="du-list bg-accent-content rounded-box shadow-md">

      <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">{{ listName() }}</li>

      @for (task of taskList(); track $index) {
        <li class="du-list-row">
          <app-task
            [title]="task.title"
            [description]="task.description"
            [tag]="task.tag">
          </app-task>
        </li>

      } @empty {
        <p>This list is empty</p>
      }
      <button (click)="addTask()" class="du-btn du-btn-primary mt-4">
        Add Task
      </button>
    </ul>
  `,
  styles: ``
})
export class List {
  listName = input<string>('Task List');
  taskList = input<TaskData[]>([]);

  taskListChange = output<TaskData[]>();
  listNameChange = output<string>();

  addTask() {
    const currentTasks = this.taskList();
    const newTasks = [...currentTasks, {
      title: 'New Task',
      description: 'Task description',
      tag: 'default'
    }];


    this.taskListChange.emit(newTasks);
  }
}
