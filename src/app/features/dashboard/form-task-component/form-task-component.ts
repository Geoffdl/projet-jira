import { Component, effect, inject, input, OnChanges, output } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskModel } from '../dashboard-models/task-model';

@Component({
  selector: 'app-form-task-component',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">

        <fieldset
          class="du-fieldset p-4 bg-base-200 border border-base-300 rounded-box"
        >
          <legend class="du-fieldset-legend">New Task</legend>

          <label class="du-label">Title</label>
          <input
            type="text"
            class="du-input"
            placeholder="task title"
            [formControl]="titleControl"
            [class.du-input-success]="titleControl.valid && titleControl.touched"
            [class.du-input-warning]="titleControl.invalid && titleControl.touched"
          />
          @if (titleControl.touched && titleControl.invalid) {
            @if (titleControl.errors?.['required']) {
              <p class="text-warning">Title is required</p>
            }
            @if (titleControl.errors?.['minlength']) {
              <p class="text-warning">
                Title must be at least 3 characters
              </p>
            }
          }
          <label class="du-label">Description</label>
          <input
            type="text"
            class="du-input"
            placeholder="task description"
            [formControl]="descriptionControl"
            [class.du-input-success]="descriptionControl.valid && descriptionControl.touched"
            [class.du-input-warning]="descriptionControl.invalid && descriptionControl.touched"
          />
          @if (descriptionControl.touched && descriptionControl.invalid) {
            @if (descriptionControl.errors?.['required']) {
              <p class="text-warning">Title is required</p>
            }
            @if (descriptionControl.errors?.['minlength']) {
              <p class="text-warning">
                Title must be at least 3 characters
              </p>
            }
          }

          <label class="du-label">Tag</label>
          <input
            type="text"
            class="du-input"
            placeholder="task tag"
            [formControl]="tagControl"
            [class.du-input-success]="tagControl.valid && tagControl.touched"
            [class.du-input-warning]="tagControl.invalid && tagControl.touched"
          />
          @if (tagControl.touched && tagControl.invalid) {
            @if (tagControl.errors?.['required']) {
              <p class="text-warning">Title is required</p>
            }
            @if (tagControl.errors?.['minlength']) {
              <p class="text-warning">
                Title must be at least 3 characters
              </p>
            }
          }

        </fieldset>

        <button type="submit" class="du-btn du-btn-primary" [disabled]="!form.valid">
          Submit
        </button>
      </form>

  `,
  styles: ``
})
export class FormTaskComponent {
  task = input<TaskModel>();




  titleControl = new FormControl("", [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(255)
  ]);
  descriptionControl = new FormControl("", [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(255)
  ]);
  tagControl = new FormControl("", [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(25)
  ]);

  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    title: this.titleControl,
    description: this.descriptionControl,
    tag: this.tagControl
  });

  formResult = output<any>();


  constructor() {
    effect(() => {
      const t = this.task();
      if (t) {
        this.form.patchValue({
          title: t.title,
          description: t.description,
          tag: t.tag
        });
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.formResult.emit(formData)
      console.log(" Form submitted:", formData);
    } else {
      console.warn("️ Form is invalid:", this.form.errors);
    }
  }
}
