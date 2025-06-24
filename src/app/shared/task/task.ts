import { Component, model } from '@angular/core';

@Component({
  selector: 'app-task',
  imports: [],
  template: `
    <div class="du-card du-card-border bg-base-100 w-auto">
      <div class="du-card-body">
        <h2 class="du-card-title">{{ title() }}</h2>
        <p>{{ description() }}</p>
        <div class="du-badge du-badge-outline du-badge-primary">{{ tag() }}</div>
        <div class="du-card-actions justify-end">
          <button class="du-btn du-btn-xs du-btn-ghost du-btn-info" (click)="updateTask()">Edit</button>
          <button class="du-btn du-btn-xs du-btn-ghost du-btn-warning" (click)="removeTask()">Delete</button>

        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class Task {
    title =  model('');
    description = model('');
    tag = model('');

  removeTask() {

  }

  updateTask() {

  }
}
