import { Component, effect, EventEmitter, inject, input, Input, output, Output } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskModel } from '../dashboard-models/task-model';

@Component({
  selector: 'app-edit-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
      <fieldset class="du-fieldset p-4 bg-base-200 border border-base-300 rounded-box">
        <legend class="du-fieldset-legend">Edit Task</legend>

        <label class="du-label">Title</label>
        <input
          type="text"
          class="du-input"
          placeholder="task title"
          formControlName="title"
          [class.du-input-success]="titleControl.valid && titleControl.touched"
          [class.du-input-warning]="titleControl.invalid && titleControl.touched"
        />
        @if (titleControl.touched && titleControl.invalid) {
          @if (titleControl.errors?.['required']) {
            <p class="text-warning">Title is required</p>
          }
          @if (titleControl.errors?.['minlength']) {
            <p class="text-warning">Title must be at least 3 characters</p>
          }
          @if (titleControl.errors?.['maxlength']) {
            <p class="text-warning">Title must be at most 255 characters</p>
          }
        }

        <label class="du-label">Description</label>
        <input
          type="text"
          class="du-input"
          placeholder="task description"
          formControlName="description"
          [class.du-input-success]="descriptionControl.valid && descriptionControl.touched"
          [class.du-input-warning]="descriptionControl.invalid && descriptionControl.touched"
        />
        @if (descriptionControl.touched && descriptionControl.invalid) {
          @if (descriptionControl.errors?.['required']) {
            <p class="text-warning">Description is required</p>
          }
          @if (descriptionControl.errors?.['minlength']) {
            <p class="text-warning">Description must be at least 3 characters</p>
          }
          @if (descriptionControl.errors?.['maxlength']) {
            <p class="text-warning">Description must be at most 255 characters</p>
          }
        }

        <label class="du-label">Tag</label>
        <input
          type="text"
          class="du-input"
          placeholder="task tag"
          formControlName="tag"
          [class.du-input-success]="tagControl.valid && tagControl.touched"
          [class.du-input-warning]="tagControl.invalid && tagControl.touched"
        />
        @if (tagControl.touched && tagControl.invalid) {
          @if (tagControl.errors?.['required']) {
            <p class="text-warning">Tag is required</p>
          }
          @if (tagControl.errors?.['minlength']) {
            <p class="text-warning">Tag must be at least 1 character</p>
          }
          @if (tagControl.errors?.['maxlength']) {
            <p class="text-warning">Tag must be at most 25 characters</p>
          }
        }
      </fieldset>

      <button type="submit" class="du-btn du-btn-primary" [disabled]="form.invalid">
        Save Changes
      </button>
    </form>
  `
})
export class FormEditTaskComponent {
  private fb = inject(FormBuilder);

  task = input.required<TaskModel>();
  taskUpdated = output<TaskModel>();

  titleControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(255),
  ]);
  descriptionControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(255),
  ]);
  tagControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(25),
  ]);

  form = this.fb.group({
    id: new FormControl(0, { nonNullable: true }),
    title: this.titleControl,
    description: this.descriptionControl,
    tag: this.tagControl,
  });

  constructor() {
    effect(() => {
      const t = this.task();
      if (t) {
        this.form.setValue({
          id: t.id,
          title: t.title,
          description: t.description,
          tag: t.tag,
        });
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.taskUpdated.emit(this.form.getRawValue() as TaskModel);
    }
  }
}
