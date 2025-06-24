import { Component, input, output } from '@angular/core';
import { Task } from '../task/task';
import { ITaskData } from '../ITaskData';
import {TaskForm} from '../task-form/task-form';

@Component({
  selector: 'app-list',
  imports: [
    Task
  ],
  template: `
    <ul class="du-list bg-accent-content rounded-box shadow-md">

      <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">{{ listName() }}</li>

      @for (task of taskList(); track $index) {
        <li class="pb-4">
          <div class="max-w-full w-[95%] mx-auto">
          <app-task
            [title]="task.title"
            [description]="task.description"
            [tag]="task.tag"
            [taskForm]="taskForm">
          </app-task>
          </div>

        </li>

      } @empty {
        <li class="mx-auto">
        <p>This list is empty</p>
        </li>
      }

      <button (click)="addTask()" class="du-btn du-btn-primary m-4">
        Add Task
      </button>

    </ul>
  `,
  styles: ``
})
export class List {
  listName = input<string>('Task List');
  taskList = input<ITaskData[]>([]);
  taskListChange = output<ITaskData[]>();
  listNameChange = output<string>();
  taskForm = TaskForm;

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
