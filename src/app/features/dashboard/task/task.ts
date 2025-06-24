import { Component, input, model } from '@angular/core';
import { ModalComponent } from '../../../shared/modal-component/modal-component';
import { TaskForm } from '../task-form/task-form';

@Component({
  selector: 'app-task',
  imports: [
    ModalComponent
  ],
  template: `
    <div class="du-card du-card-border bg-base-100 w-full">
      <div class="du-card-body">
        <h2 class="du-card-title">{{ title() }}</h2>
        <p>{{ description() }}</p>
        <div class="du-badge du-badge-outline du-badge-primary">{{ tag() }}</div>
        <div class="du-card-actions justify-end">
          <!--          <button class="du-btn du-btn-xs du-btn-outline du-btn-info" (click)="updateTask()">Edit</button>-->
          <app-modal-component [component]="taskForm()" [openBtnName]="'Edit'"></app-modal-component>
          <button class="du-btn du-btn-xs du-btn-outline du-btn-error" (click)="removeTask()">Delete</button>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class Task {

  title = model('');
  description = model('');
  tag = model('');
  taskForm: any = input();

  removeTask() {

  }

  updateTask() {

  }

}
