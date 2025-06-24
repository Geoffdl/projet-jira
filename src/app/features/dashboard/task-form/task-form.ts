import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskFormData } from './task-form-data';

@Component({
  selector: 'app-task-form',
  imports: [
    FormsModule
  ],
  template: `
    <div class="flex flex-col gap-4">
      <form (ngSubmit)="onSubmit()">
        <fieldset
          class="du-fieldset bg-base-200 border-base-300 rounded-box w-full border p-4"
        >
          <legend class="du-fieldset-legend">Edit Task</legend>

          <label class="du-label">Title</label>
          <input
            type="text"
            [ngModel]="title()"
            (ngModelChange)="title.set($event)"
            class="du-input"
            placeholder="task title"
            name="title"
          />

          <label class="du-label">Task description</label>
          <input
            type="text"
            [ngModel]="description()"
            (ngModelChange)="description.set($event)"
            class="du-input"
            placeholder="task description"
            name="description"
          />

          <label class="du-label">Tag</label>
          <input
            type="text"
            [ngModel]="tag()"
            (ngModelChange)="tag.set($event)"
            class="du-input"
            placeholder="task tag"
            name="tag"
          />

        </fieldset>

        <button
          type="submit"
          class="du-btn du-btn-secondary du-btn-soft"
        >
          Submit
        </button>
      </form>
    </div>
  `,
  styles: ``
})
export class TaskForm {
  title = signal('');
  description = signal('');
  tag = signal('');


  onSubmit() {
    const result = {
      title: this.title(),
      description: this.description(),
      tag: this.tag()
    };
  }
}
