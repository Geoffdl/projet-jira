import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-board-component',
  imports: [
    ReactiveFormsModule
  ],
  template: `
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
        <fieldset
          class="du-fieldset p-4 bg-base-200 border border-base-300 rounded-box"
        >
          <legend class="du-fieldset-legend">New Board</legend>

          <label class="du-label">Title</label>
          <input
            type="text"
            class="du-input"
            placeholder="board title"
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

        </fieldset>

        <button type="submit" class="du-btn du-btn-primary" [disabled]="!form.valid">
          Submit
        </button>
      </form>
  `,
  styles: ``
})
export class FormBoardComponent {
  titleControl = new FormControl("", [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(255)
  ]);

  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    title: this.titleControl,

  });

  formResult = output<any>();


  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;

      this.formResult.emit(formData)
      console.log(" Form submitted:", formData);
      this.form.reset();
    } else {
      console.warn("️ Form is invalid:", this.form.errors);
    }
  }
}
